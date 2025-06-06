import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const uri = process.env.MONGO_URI;

const ReservationSchema = new mongoose.Schema({
  activityId: String, name: String, email: String, phone: String, date: String, time: String, created: Date
});
const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);

const ActivitySchema = new mongoose.Schema({
  name: String,
  description: String,
  images: [String],
  price: String,
  info: String,
  category: String,
  mainImage: String,
  hasQuantity: { type: Boolean, default: false },
  quantity: { type: Number, default: 1 }
});
const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);

// Helper: send email to admin
async function sendAdminEmail(reservation, activity) {
  // Use environment variables for credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL_USER,
      pass: process.env.ADMIN_EMAIL_PASS
    }
  });
  const mailOptions = {
    from: `Rezervacijos sistema <${process.env.ADMIN_EMAIL_USER}>`,
    to: 'aurimav05@gmail.com',
    subject: `Nauja rezervacija: ${activity.name}`,
    text: `Gauta nauja rezervacija!\n\nVeikla: ${activity.name}\nKategorija: ${activity.category}\nVardas: ${reservation.name}\nEl. paštas: ${reservation.email}\nTelefonas: ${reservation.phone}\nData: ${reservation.date}\nLaikas: ${reservation.time}`
  };
  await transporter.sendMail(mailOptions);
}

export default async function handler(req, res) {
  if (!mongoose.connection.readyState) await mongoose.connect(uri);
  if (req.method === 'POST') {
    const { activityId, date, time } = req.body;
    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(400).json({ error: 'Activity not found' });
    if (activity.hasQuantity) {
      // Count reservations for this activity/date/time
      const count = await Reservation.countDocuments({ activityId, date, time });
      if (activity.quantity <= 0) {
        return res.status(400).json({ error: 'No more slots available for this activity' });
      }
      if (count >= activity.quantity) {
        return res.status(400).json({ error: 'No more slots available for this time' });
      }
    } else {
      // Check if already reserved for this date/time
      const exists = await Reservation.findOne({ activityId, date, time });
      if (exists) {
        return res.status(400).json({ error: 'This time is already reserved' });
      }
    }
    const reservation = new Reservation({ ...req.body, created: new Date() });
    await reservation.save();
    // Decrement quantity for hasQuantity activities (global, not per slot)
    if (activity.hasQuantity) {
      // Only decrement if there are still available slots (should be true here)
      activity.quantity = Math.max(0, activity.quantity - 1);
      await activity.save();
    }
    // Send email to admin
    try {
      await sendAdminEmail(reservation, activity);
    } catch (e) {
      // Log but don't block reservation
      console.error('Failed to send admin email:', e);
    }
    res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    const { activityId, date } = req.query;
    if (activityId) {
      // Return reservations for a specific activity (optionally filtered by date)
      const filter = { activityId };
      if (date) filter.date = date;
      const reservations = await Reservation.find(filter);
      res.status(200).json(reservations);
      return;
    }
    // Return all reservations for admin
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } else if (req.method === 'DELETE') {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id' });
    await Reservation.findByIdAndDelete(_id);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
