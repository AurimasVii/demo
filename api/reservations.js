import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

const ReservationSchema = new mongoose.Schema({
  activityId: String, name: String, email: String, phone: String, date: String, time: String, created: Date
});
const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);

export default async function handler(req, res) {
  if (!mongoose.connection.readyState) await mongoose.connect(uri);
  if (req.method === 'POST') {
    const reservation = new Reservation({ ...req.body, created: new Date() });
    await reservation.save();
    res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
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
