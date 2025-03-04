import React, { useState } from "react";
import { Modal } from "./Modal";
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string;
  };
}
export const CheckoutModal = ({
  isOpen,
  onClose,
  product
}: CheckoutModalProps) => {
  const [loading, setLoading] = useState(false);
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Checkout">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h4 className="font-medium">{product?.name}</h4>
          <p className="text-sm text-gray-500">{product?.price}</p>
        </div>
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input type="text" placeholder="4242 4242 4242 4242" className="w-full p-2 border rounded-lg" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <input type="text" placeholder="123" className="w-full p-2 border rounded-lg" required />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50">
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </Modal>;
};