import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

const ActivitySchema = new mongoose.Schema({
  name: String, description: String, images: [String], price: String, info: String, category: String
});
const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export default async function handler(req, res) {
  if (!mongoose.connection.readyState) await mongoose.connect(uri);
  if (req.method === 'POST') {
    // Create new activity
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } else if (req.method === 'PUT') {
    const { _id, ...update } = req.body;
    if (!_id || !isValidObjectId(_id)) return res.status(400).json({ error: 'Invalid _id' });
    const updated = await Activity.findByIdAndUpdate(_id, update, { new: true });
    res.status(200).json(updated);
  } else if (req.method === 'DELETE') {
    const { _id } = req.body;
    if (!_id || !isValidObjectId(_id)) return res.status(400).json({ error: 'Invalid _id' });
    await Activity.findByIdAndDelete(_id);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
