require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Define schemas
const Activity = mongoose.model('Activity', new mongoose.Schema({
  name: String, description: String, images: [String], price: String, info: String, category: String
}));
const Reservation = mongoose.model('Reservation', new mongoose.Schema({
  activityId: String, name: String, email: String, phone: String, date: String, time: String, created: Date
}));
const Admin = mongoose.model('Admin', new mongoose.Schema({
  username: String, passwordHash: String
}));

// Example routes (expand as needed)
app.get('/api/activities', async (req, res) => res.json(await Activity.find()));
app.post('/api/reservations', async (req, res) => {
  const r = new Reservation({ ...req.body, created: new Date() });
  await r.save();
  res.json({ success: true });
});

// ...add admin login, activity management, reservation management, etc.

app.listen(process.env.PORT || 4000, () => console.log('Server running'));