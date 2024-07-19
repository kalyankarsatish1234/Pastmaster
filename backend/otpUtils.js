// backend/utils/otpUtils.js
const otpGenerator = require('otp-generator');

// Generate OTP and send it via SMS (simulated here)
const sendOTP = (phoneNumber) => {
  const otp = otpGenerator.generate(6, { digits: true, specialChars: false, upperCase: false, lowerCase: false });
  // You can integrate an SMS service here to send the OTP
  console.log(`Sending OTP ${otp} to ${phoneNumber}`); // Simulate OTP sending
  return otp;
};

// Verify the OTP
const verifyOTP = (storedOtp, inputOtp) => storedOtp === inputOtp;

module.exports = { sendOTP, verifyOTP };
