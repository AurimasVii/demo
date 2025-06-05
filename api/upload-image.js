import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const form = new IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public', 'icons');
  form.keepExtensions = true;
  form.maxFileSize = 5 * 1024 * 1024; // 5MB

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload failed' });
    const file = files.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    // Use a fallback filename if originalFilename is missing
    let origName = file.originalFilename || 'upload';
    origName = String(origName).replace(/[^a-zA-Z0-9.\-_]/g, '');
    const fileName = Date.now() + '-' + origName;
    const destPath = path.join(form.uploadDir, fileName);
    fs.renameSync(file.filepath, destPath);
    // Return the public URL
    res.status(200).json({ url: '/icons/' + fileName });
  });
}
