import React, { useState } from 'react';
import axios from 'axios';

const CreatePastePage = () => {
  const [text, setText] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  // Determine if the button should be disabled
  const isButtonDisabled = text.trim() === '';

  const handleCreatePaste = async () => {
    try {
      setError('');
      const response = await axios.post('/api/pastes', { text });
      setOtp(response.data.otp);
      setShowOtp(true);
      setCopyStatus('');  // Clear the copy status when creating a new paste
    } catch (error) {
      console.error('Error creating paste:', error);
      setError(error.response?.data?.error || 'Failed to create paste. Please try again.');
    }
  };

  const handleCopyOtp = () => {
    navigator.clipboard.writeText(otp);
    setCopyStatus('OTP Copied!');
    setTimeout(() => setCopyStatus(''), 2000); // Reset status after 2 seconds
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl lg:text-2xl font-medium mb-4 text-center text-black">Create Paste</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        rows="6"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full h-auto min-h-[120px] max-h-[250px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-auto text-sm md:text-base"
      />
      <button
        onClick={handleCreatePaste}
        className={`py-2 px-4 rounded-lg shadow-md transition duration-300 w-full text-sm md:text-base font-medium ${isButtonDisabled ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        disabled={isButtonDisabled}
      >
        Create Paste
      </button>
      {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      {showOtp && (
        <div className="mt-4 text-center">
          <p className="text-base md:text-lg mb-2 text-gray-700">Your OTP is:</p>
          <p className="text-lg font-medium text-blue-600">{otp}</p>
          <button
            onClick={handleCopyOtp}
            className={`py-2 px-4 rounded-lg shadow-md transition duration-300 mt-2 text-sm md:text-base font-medium ${otp ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
            disabled={!otp}
          >
            {copyStatus || 'Copy OTP'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatePastePage;
