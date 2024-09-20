import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongodb';
import Task from '@/models/Task';
import { authenticateToken, AuthenticatedRequest } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        authenticateToken(req as AuthenticatedRequest, res, async () => {
          const tasks = await Task.find({ user: (req as AuthenticatedRequest).user?.id });
          res.status(200).json(tasks);
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        authenticateToken(req as AuthenticatedRequest, res, async () => {
          const task = await Task.create({
            ...req.body,
            user: (req as AuthenticatedRequest).user?.id
          });
          res.status(201).json(task);
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}