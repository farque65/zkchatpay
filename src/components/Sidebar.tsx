import React, { useState } from "react";
import { MessageSquare, Users, ShoppingBag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProfileModal } from "./modals/ProfileModal";
export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileName, setProfileName] = useState("User Name");
  const [profileImage, setProfileImage] = useState("");
  const isActive = (path: string) => location.pathname === path;
  const handleProfileUpdate = (name: string, image: string) => {
    setProfileName(name);
    setProfileImage(image);
  };
  return <div className="w-20 bg-gray-900 flex flex-col items-center py-4 text-gray-400">
      <div className="flex flex-col items-center">
        <button onClick={() => setIsProfileModalOpen(true)} className="relative group w-12 h-12 rounded-full overflow-hidden bg-gray-800 hover:ring-2 hover:ring-blue-500 transition-all">
          {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-800" />}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <span className="mt-2 text-xs text-center text-gray-400 w-full truncate px-1">
          {profileName}
        </span>
      </div>
      <nav className="space-y-8 mt-8">
        <button onClick={() => navigate("/chats")} className={`p-3 rounded-lg hover:bg-gray-800 hover:text-white ${isActive("/chats") ? "bg-gray-800 text-white" : ""}`}>
          <MessageSquare size={24} />
        </button>
        <button onClick={() => navigate("/contacts")} className={`p-3 rounded-lg hover:bg-gray-800 hover:text-white ${isActive("/contacts") ? "bg-gray-800 text-white" : ""}`}>
          <Users size={24} />
        </button>
        <button onClick={() => navigate("/shop")} className={`p-3 rounded-lg hover:bg-gray-800 hover:text-white ${isActive("/shop") ? "bg-gray-800 text-white" : ""}`}>
          <ShoppingBag size={24} />
        </button>
      </nav>
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} currentName={profileName} currentImage={profileImage} onSave={handleProfileUpdate} />
    </div>;
};