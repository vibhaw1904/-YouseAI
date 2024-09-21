import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import Task from '@/models/Task';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth'; // Assuming authOptions is exported from this file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Connect to the database
  await connectDB();

  // Get user session using next-auth
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'You must be signed in to access this route' });
  }

  // Extract the user's ID from the session
  const userId = session.user?.id;

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find({ user: userId });
        res.status(200).json(tasks);
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const task = await Task.create({
          ...req.body,
          user: userId,
        });
        res.status(201).json(task);
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` });
      break;
  }
}
