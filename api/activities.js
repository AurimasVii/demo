import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

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

export default async function handler(req, res) {
  if (!mongoose.connection.readyState) await mongoose.connect(uri);
  if (req.method === 'GET') {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } else {
    res.status(405).end();
  }
}
