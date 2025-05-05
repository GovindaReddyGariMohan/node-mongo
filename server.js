require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Allow CORS for frontend
app.use(express.json()); // Parse JSON requests

// Optional: root route for testing
app.get('/', (req, res) => {
  res.send('API is running');
});

// Routes
app.use('/api/items', itemRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
