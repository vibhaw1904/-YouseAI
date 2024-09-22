import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';

interface UserTask {
  _id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<UserTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === "loading" || !session?.accessToken) return; // Only fetch when session is ready and token exists
    fetchTask();
  }, [session?.accessToken, status]);

  const fetchTask = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ tasks: UserTask[]; message: string }>('/api/tasks', {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      
      // Check if response has a 'tasks' array and set it to state
      if (Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
      } else {
        console.error('Invalid response, expected an array in tasks but got:', response.data);
        setError('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error); // Log error for debugging
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken]);
  

  const createTask = async (newTask: Omit<UserTask, '_id'>) => {
    if (!session?.accessToken) throw new Error('Not authenticated');
    try {
      const response = await axios.post<UserTask>('/api/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      // Ensure tasks is an array before spreading
      if (Array.isArray(tasks)) {
        setTasks([...tasks, response.data]);
      } else {
        console.error('Expected tasks to be an array but got:', tasks);
        setError('Failed to add new task');
      }

      return response.data;
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<UserTask>) => {
    if (!session?.accessToken) throw new Error('Not authenticated');
    try {
      const response = await axios.put<UserTask>(`/api/tasks/${id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      return response.data;
    } catch (err) {
      setError('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    if (!session?.accessToken) throw new Error('Not authenticated');
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  return { tasks, fetchTask, loading, error, deleteTask, createTask, updateTask };
};
