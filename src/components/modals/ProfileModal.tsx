import React, { useState, useRef } from "react";
import { Modal } from "./Modal";
import { Upload } from "lucide-react";
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentImage: string;
  onSave: (name: string, image: string) => void;
}
export const ProfileModal = ({
  isOpen,
  onClose,
  currentName,
  currentImage,
  onSave
}: ProfileModalProps) => {
  const [name, setName] = useState(currentName);
  const [imagePreview, setImagePreview] = useState(currentImage);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSave(name, imagePreview);
    setLoading(false);
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              <img src={imagePreview || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
              <Upload className="text-white" size={24} />
            </button>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-2 text-sm text-blue-500 hover:text-blue-600">
            Change Photo
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Name
          </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Enter your name" required />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Modal>;
};