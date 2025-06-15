import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { email } = req.body;

		if (!email || typeof email !== 'string') {
			return res.status(400).json({ error: 'Invalid email' });
		}

		try {
			const filePath = path.resolve('./emails/list.csv');
			const line = `${email.trim()}\n`;
			fs.appendFileSync(filePath, line, 'utf8');

			return res.status(200).json({ message: 'Email saved' });
		} catch (error) {
			console.error('Write error:', error);
			return res.status(500).json({ error: 'Could not save email' });
		}
	}

	res.status(405).json({ error: 'Method not allowed' });
}
