import React, { useState } from 'react';

interface AddScreenModalProps {
  onClose: () => void;
}

const AddScreenModal: React.FC<AddScreenModalProps> = ({ onClose }) => {
  // State for each input field
  const [screenName, setScreenName] = useState('');
  const [screenSize, setScreenSize] = useState('');
  const [description, setDescription] = useState('');
  const [resolution, setResolution] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [file, setFile] = useState<File | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your screen creation logic here
    
    onClose(); // Close modal after submission
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle input changes
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-800 rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Add New Screen</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Screen Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Screen Name</label>
            <input
              type="text"
              placeholder="Enter screen name"
              value={screenName}
              onChange={handleInputChange(setScreenName)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Screen Size */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Screen Size</label>
            <input
              type="text"
              placeholder="Enter screen size"
              value={screenSize}
              onChange={handleInputChange(setScreenSize)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Description</label>
            <textarea
              placeholder="Enter screen description"
              value={description}
              onChange={handleInputChange(setDescription)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>

          {/* Resolution */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Resolution</label>
            <input
              type="text"
              placeholder="Enter resolution"
              value={resolution}
              onChange={handleInputChange(setResolution)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={handleInputChange(setLocation)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Latitude and Longitude */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Latitude and Longitude</label>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Latitude: 37.7749"
                value={latitude}
                onChange={handleInputChange(setLatitude)}
                className="w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Longitude: -122.4194"
                value={longitude}
                onChange={handleInputChange(setLongitude)}
                className="w-1/2 px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={handleInputChange(setPrice)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image/Video Upload */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Upload Image/Video</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose} // Close modal on cancel
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
            >
              Add Screen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScreenModal;
