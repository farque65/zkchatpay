import React, { useState } from "react";
import { Send, ShoppingCart, CreditCard } from "lucide-react";
import { SendModal } from "./modals/SendModal";
interface Message {
  id: number;
  text: string;
  isSent: boolean;
  isTransaction?: boolean;
  amount?: string;
}
export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    text: "Hey! Can you send me 0.1 ETH?",
    isSent: true
  }, {
    id: 2,
    text: "Sure! Sending it now.",
    isSent: false
  }]);
  const [inputText, setInputText] = useState("");
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, {
      id: messages.length + 1,
      text: inputText,
      isSent: true
    }]);
    setInputText("");
  };
  const handleSendEth = (amount: string, address: string) => {
    setMessages([...messages, {
      id: messages.length + 1,
      text: `Sent ${amount} ETH to ${address}`,
      isSent: true,
      isTransaction: true,
      amount
    }]);
  };
  return <div className="flex-1 flex flex-col bg-white">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Chat with John</h2>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {messages.map(message => <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
            <div className={`${message.isSent ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"} rounded-lg p-3 max-w-md ${message.isTransaction ? "border-2 border-green-500" : ""}`}>
              {message.isTransaction ? <div className="flex items-center space-x-2">
                  <CreditCard size={16} />
                  <span>{message.text}</span>
                </div> : message.text}
            </div>
          </div>)}
      </div>
      <div className="p-4 border-t flex items-center space-x-2">
        <button onClick={() => setSendModalOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg" title="Send ETH">
          <CreditCard size={20} className="text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <ShoppingCart size={20} className="text-gray-500" />
        </button>
        <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Type a message..." className="flex-1 p-2 border rounded-lg" onKeyPress={e => {
        if (e.key === "Enter") {
          handleSendMessage();
        }
      }} />
        <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-lg">
          <Send size={20} />
        </button>
      </div>
      <SendModal isOpen={sendModalOpen} onClose={() => setSendModalOpen(false)} onSend={handleSendEth} />
    </div>;
};