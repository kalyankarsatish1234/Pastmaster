import React, { useState } from 'react';
import axios from 'axios';

const GetPastePage = () => {
  const [otpInput, setOtpInput] = useState('');
  const [pasteText, setPasteText] = useState('');
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [isCopied, setIsCopied] = useState(false);  // New state to track if text is copied

  // Determine if the button should be disabled
  const isGetTextButtonDisabled = otpInput.trim() === '';
  const isCopyButtonDisabled = pasteText.trim() === '';

  const handleGetPaste = async () => {
    try {
      setError('');
      const response = await axios.post(`/api/pastes/${otpInput}`);
      setPasteText(response.data.text);
      setOtpInput('');
      setCopyStatus('');  // Clear the copy status when getting new text
      setIsCopied(false);  // Reset the copy status
    } catch (error) {
      console.error('Error retrieving paste:', error);
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(pasteText);
    setCopyStatus('Copied!');
    setIsCopied(true);  // Update the state to show that text is copied
    setTimeout(() => {
      setCopyStatus('');
      setIsCopied(false);  // Reset the copied state after 2 seconds
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl lg:text-2xl font-medium mb-4 text-center text-black">Get Paste</h2>
      <input
        type="text"
        value={otpInput}
        onChange={(e) => setOtpInput(e.target.value)}
        placeholder="Enter OTP"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full h-10 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleGetPaste}
        className={`py-2 px-4 rounded-lg shadow-md transition duration-300 w-full text-sm md:text-base font-medium ${isGetTextButtonDisabled ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        disabled={isGetTextButtonDisabled}
      >
        Get Text
      </button>
      {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      {pasteText && (
        <div className="mt-4">
          <textarea
            value={pasteText}
            readOnly
            rows="6"
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full h-auto min-h-[120px] max-h-[250px] bg-gray-50 text-gray-700 resize-none overflow-auto text-sm md:text-base"
          />
          <button
            onClick={handleCopyText}
            className={`py-2 px-4 rounded-lg shadow-md transition duration-300 w-full text-sm md:text-base font-medium ${isCopyButtonDisabled ? 'bg-blue-300 cursor-not-allowed' : isCopied ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            disabled={isCopyButtonDisabled}
          >
            {copyStatus || 'Copy Text'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GetPastePage;
