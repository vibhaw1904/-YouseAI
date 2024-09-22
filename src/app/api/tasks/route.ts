import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Task from '@/models/Task';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';

// GET method to fetch tasks
export async function GET(req: NextRequest) {
  await connectDB();

  // Get user session using next-auth
  const session = await getServerSession(authOptions);
  console.log(session);
  
  if (!session) {
    return NextResponse.json({ error: 'You must be signed in to access this route' }, { status: 401 });
  }

  // Extract the user's ID from the session
  const userId = session.user?.id;
  console.log(userId);

  if (!userId) {
    return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
  }

  try {
    // Fetch tasks based on userId, assuming user field refers to the user
    const tasks = await Task.find({ user: userId });
    
    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ tasks: [], message: 'No tasks found for this user' }, { status: 200 });
    }
    return NextResponse.json(tasks, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ success: false, message: 'Server error while fetching tasks' }, { status: 500 });
  }
}


// POST method to create a task
export async function POST(req: NextRequest) {
  await connectDB();

  // Get user session using next-auth
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'You must be signed in to access this route' }, { status: 401 });
  }

  // Extract the user's ID from the session
  const userId = session.user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const task = await Task.create({
      ...body,
      user: userId,
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json({ success: false, message: 'Server error while creating task' }, { status: 500 });
  }
}
