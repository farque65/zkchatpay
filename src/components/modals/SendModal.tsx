import React, { useState } from "react";
import { Modal } from "./Modal";
interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: (amount: string, address: string) => void;
}
export const SendModal = ({
  isOpen,
  onClose,
  onSend
}: SendModalProps) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (onSend) {
      onSend(amount, address);
    }
    setLoading(false);
    setAddress("");
    setAmount("");
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Send ETH">
      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Address
          </label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="0x..." className="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (ETH)
          </label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.0" step="0.01" min="0" className="w-full p-2 border rounded-lg" required />
        </div>
        <div className="pt-4">
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50">
            {loading ? "Processing..." : "Confirm Send"}
          </button>
        </div>
      </form>
    </Modal>;
};