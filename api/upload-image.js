import { IncomingForm } from 'formidable';
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const form = new IncomingForm();
  form.keepExtensions = true;
  form.maxFileSize = 5 * 1024 * 1024; // 5MB

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload failed' });
    let file = files.file;
    if (Array.isArray(file)) file = file[0];
    if (!file || !file.filepath) {
      return res.status(400).json({ error: 'No file uploaded or file missing path' });
    }
    let origName = file.originalFilename || file.name || 'upload';
    origName = String(origName).replace(/[^a-zA-Z0-9.\-_]/g, '');
    const fileName = Date.now() + '-' + origName;
    // Read file buffer
    const fs = await import('fs/promises');
    const data = await fs.readFile(file.filepath);
    // Upload to Vercel Blob Storage
    const { url } = await put('activity-images/' + fileName, data, { access: 'public' });
    res.status(200).json({ url });
  });
}
