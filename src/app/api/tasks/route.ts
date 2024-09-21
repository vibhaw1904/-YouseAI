import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import Task from '@/models/Task';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth'; // Assuming authOptions is exported from this file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Connect to the database with error handling
  await connectDB().catch((err) => {
    return res.status(500).json({ error: 'Database connection failed', message: err.message });
  });

  // Get user session using next-auth
  const session = await getServerSession(req, res, authOptions).catch((err) => {
    return res.status(500).json({ error: 'Session retrieval failed', message: err.message });
  });

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
      } catch (error: any) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching tasks' });
      }
      break;

    case 'POST':
      try {
        const task = await Task.create({
          ...req.body,
          user: userId,
        });
        res.status(201).json(task);
      } catch (error: any) {
        console.error('Error creating task:', error);
        res.status(500).json({ success: false, message: 'Server error while creating task' });
      }
      break;

    default:
      res.status(405).json({ success: false, message: `Method ${method} not allowed` });
      break;
  }
}
