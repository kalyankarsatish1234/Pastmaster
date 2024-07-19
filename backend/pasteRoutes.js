// backend/routes/pasteRoutes.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { sendOTP, verifyOTP } = require('../utils/otpUtils');

let pastes = {};  // In-memory storage for pastes and OTPs (use a database in a production environment)

router.post('/create', (req, res) => {
  const { text } = req.body;
  const id = uuidv4();
  pastes[id] = { text, otp: null };
  res.json({ id });
});

router.post('/send-otp/:id', (req, res) => {
  const { id } = req.params;
  const { phoneNumber } = req.body; // Assume phone number is provided in the request body
  const otp = sendOTP(phoneNumber);
  pastes[id].otp = otp; // Store the OTP
  res.json({ message: 'OTP sent' });
});

router.post('/verify-otp/:id', (req, res) => {
  const { id } = req.params;
  const { otp } = req.body;

  if (verifyOTP(pastes[id].otp, otp)) {
    res.json({ text: pastes[id].text });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = router;
