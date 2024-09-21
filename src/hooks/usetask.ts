import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from 'axios'
interface UserTask{
    _id:string,
    title:string,
    description:string,
    status: 'To Do' | 'In Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: Date;
}

export const useTasks=()=>{
    const[tasks,setTasks]=useState<UserTask[]>([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState<string|null>(null);
    const{data:session}=useSession();



    const  fetchTask=async ()=>{
        if(!session)return ;
        try {
            setLoading(true);
            const response=await axios.get<UserTask[]>('api/tasks',{
                headers:{
                    Authorization:`Bearer ${session.accessToken}`
                }
            });
            setTasks(prevTasks => [...prevTasks, ...response.data]);
            return response.data
        } catch (error) {
            setError('Failed to fetch tasks');
        }
        finally{
            setLoading(false);

        }
    }
    const updateTask=async(id:string,updatedTask : Partial<UserTask>)=>{
        if(!session) throw new Error('Not authenticated');
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
    }
    
    return {tasks,fetchTask}
}