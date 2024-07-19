const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 7000;

// Configure CORS middleware
const allowedOrigins = [
  'https://codeshare-zeta-steel.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'], // Specify allowed methods
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

const pastes = {};

// Function to generate a 4-digit OTP
const generateOtp = () => {
  return String(Math.floor(1000 + Math.random() * 9000));  // Generates a 4-digit number
};

// Route to create a paste
app.post('/api/pastes', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  let otp = generateOtp();

  // Ensure OTP uniqueness
  while (pastes[otp]) {
    otp = generateOtp();  // Regenerate OTP if it already exists
  }

  pastes[otp] = { text };
  res.json({ otp });
});

// Route to retrieve a paste
app.get('/api/pastes/:otp', (req, res) => {
  const { otp } = req.params;
  if (pastes[otp]) {
    res.json(pastes[otp]);
  } else {
    res.status(404).json({ error: 'Paste not found' });
  }
});

// Serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
