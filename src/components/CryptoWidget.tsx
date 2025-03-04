import React, { useState } from "react";
import { Wallet } from "lucide-react";
import { SendModal } from "./modals/SendModal";
export const CryptoWidget = () => {
  const [sendModalOpen, setSendModalOpen] = useState(false);
  return <>
      <div className="bg-white shadow-sm p-4 flex items-center justify-end space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">ETH Balance:</span>
          <span className="text-sm font-bold">2.45 ETH</span>
        </div>
        <button onClick={() => setSendModalOpen(true)} className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          <Wallet size={16} />
          <span>Send</span>
        </button>
      </div>
      <SendModal isOpen={sendModalOpen} onClose={() => setSendModalOpen(false)} />
    </>;
};