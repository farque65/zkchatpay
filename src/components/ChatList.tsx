import React from "react";
import { useNavigate } from "react-router-dom";
const chats = [{
  id: 1,
  name: "John Doe",
  lastMessage: "Hey! Can you send me 0.1 ETH?",
  time: "2m ago"
}, {
  id: 2,
  name: "Alice Smith",
  lastMessage: "Check out this new NFT!",
  time: "1h ago"
}, {
  id: 3,
  name: "Bob Johnson",
  lastMessage: "Thanks for the payment",
  time: "2h ago"
}];
export const ChatList = () => {
  const navigate = useNavigate();
  return <div className="flex-1 bg-white">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="divide-y">
        {chats.map(chat => <div key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)} className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <h3 className="font-medium">{chat.name}</h3>
                <p className="text-sm text-gray-500">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-400">{chat.time}</span>
            </div>
          </div>)}
      </div>
    </div>;
};