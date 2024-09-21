import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
    const createTask = async (newTask: Omit<Task, '_id'>) => {
        if (!session) throw new Error('Not authenticated');
    
        try {
          const response = await axios.post<Task>('/api/tasks', newTask, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          setTasks([...tasks, response.data]);
          return response.data;
        } catch (err) {
          setError('Failed to create task');
          throw err;
        }
      };
    
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
    const deleteTask=async(id:string)=>{
if(!session)throw new Error('not authenticated');
        try {
            await axios.delete(`api/tasks${id}`,{
                headers:{
                    Authorization:`Bearer ${session.accessToken}`
                }
            })
            setTasks(tasks.filter(task=>task._id!==id))
        } catch (error) {
            setError('Failed to delete task')
        }
    };
    useEffect(()=>{
if(session){
    fetchTask();
}
    },[session])
    return {tasks,fetchTask,loading,error,deleteTask,createTask
        ,updateTask
    }
}