// AddListingButton.tsx
import React from 'react';

interface AddListingButtonProps {
  onClick?: () => void;
}

const AddListingButton: React.FC<AddListingButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border-2 border-dashed border-gray-400 p-6 rounded cursor-pointer hover:border-purple-500 text-center text-gray-600 font-medium transition-all duration-300"
    >
      <span className="text-3xl font-bold text-purple-500">+</span>
      <p className="mt-2">Add Listing</p>
    </div>
  );
};

export default AddListingButton;