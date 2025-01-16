import { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../lib/firebaseAdmin'; // Ensure this initializes Firebase Admin SDK
import { prisma } from '../../../lib/prisma'; // Optional: For relational DB cleanup if needed

const deleteLead = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { leadId } = req.body;

  if (!leadId) {
    return res.status(400).json({ error: 'Lead ID is required' });
  }

  try {
    // Delete Firestore document
    const leadRef = admin.firestore().collection('leads').doc(leadId);
    const leadSnapshot = await leadRef.get();

    if (!leadSnapshot.exists) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Delete associated files in Firestore Storage if needed
    const bucket = admin.storage().bucket();
    const files = await bucket.getFiles({ prefix: `leads/${leadId}` });
    for (const file of files[0]) {
      await file.delete();
    }

    // Delete the document
    await leadRef.delete();

    // Optional: If you use Prisma for relational DB, delete here
    await prisma.lead.delete({
      where: { id: leadId },
    });

    res.status(200).json({ message: 'Lead and associated files deleted successfully.' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Failed to delete lead.' });
  }
};

export default deleteLead;
