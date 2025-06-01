import React, { useState } from 'react';
import web3Service from '../services/web3Service';
import ipfsService from '../services/ipfsService';

const AddRecordForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    crime: '',
    location: '',
    victim: '',
    amount: '',
    description: '',
    category: '',
    officer: '',
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let ipfsHash = '';
      if (formData.file) {
        ipfsHash = await ipfsService.uploadFile(formData.file);
      }

      await web3Service.init();
      await web3Service.connectWallet();

      await web3Service.addCriminalRecord({
        ...formData,
        ipfsHash,
      });

      alert(' Record added successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to add record');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-white mb-2">Add Criminal Record</h2>
      <p className="text-gray-300 mb-4">
        Fill out the form below to add a new criminal record. Ensure all fields are filled out correctly, and you can upload supporting documents if needed.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {['name', 'crime', 'location', 'victim', 'amount', 'description', 'category', 'officer'].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        ))}
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded font-semibold transition-colors duration-200 disabled:opacity-60"
      >
        {isSubmitting ? 'Submitting...' : 'Add Record'}
      </button>
    </form>
  );
};

export default AddRecordForm;
