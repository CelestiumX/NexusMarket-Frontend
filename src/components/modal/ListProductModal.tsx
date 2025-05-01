// components/ListProductModal.tsx
import React, { useState } from 'react';

interface ListProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: { title: string; category: string; price: string; description: string; image: File | null }) => void;
}

const ListProductModal: React.FC<ListProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Physical',
    price: '',
    description: '',
    image: null as File | null,
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProduct((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newProduct);
    // Reset form
    setNewProduct({
      title: '',
      category: 'Physical',
      price: '',
      description: '',
      image: null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
      <div className="bg-dark-bg rounded-lg p-6 w-full max-w-lg border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">List a New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1 text-white">
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1 text-white">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Physical">Physical</option>
              <option value="Digital">Digital</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1 text-white">
              Price (XLM)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price in XLM"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1 text-white">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              rows={4}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1 text-white">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-gray-800 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              List Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListProductModal;