import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../config/firestore'; // Replace with your database connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { type, query, userId } = req.query;
    try {
      const suggestions = await db('suggestions')
        .where('type', type)
        .andWhere('value', 'like', `%${query}%`)
        .andWhere('user_id', userId);
      res.status(200).json(suggestions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching suggestions' });
    }
  } else if (req.method === 'POST') {
    const { type, value, userId } = req.body;
    try {
      await db('suggestions').insert({ type, value, user_id: userId }).onConflict(['type', 'value', 'user_id']).ignore();
      res.status(201).json({ message: 'Suggestion added' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding suggestion' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
