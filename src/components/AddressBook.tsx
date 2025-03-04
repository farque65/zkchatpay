import React from "react";
import { useNavigate } from "react-router-dom";
const contacts = [{
  id: 1,
  name: "John Doe",
  wallet: "0x1234...5678",
  status: "Online"
}, {
  id: 2,
  name: "Alice Smith",
  wallet: "0x8765...4321",
  status: "Offline"
}, {
  id: 3,
  name: "Bob Johnson",
  wallet: "0x9876...1234",
  status: "Online"
}, {
  id: 4,
  name: "Emma Wilson",
  wallet: "0x5432...8765",
  status: "Online"
}];
export const AddressBook = () => {
  const navigate = useNavigate();
  return <div className="flex-1 bg-white">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Contacts</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {contacts.map(contact => <div key={contact.id} onClick={() => navigate(`/chat/${contact.id}`)} className="p-4 border rounded-lg hover:shadow-md cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div>
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.wallet}</p>
                <span className={`text-xs ${contact.status === "Online" ? "text-green-500" : "text-gray-400"}`}>
                  {contact.status}
                </span>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};