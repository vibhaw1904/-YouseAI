"use client"

import * as React from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useTasks } from "@/hooks/usetask"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TaskStatus = "To Do" | "In Progress" | "Completed"
type Taskpriority='Low' | 'Medium' | 'High';
interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority:Taskpriority
}

export default function AllTasksWithStatus() {
//   const [tasks, setTasks] = React.useState<Task[]>([
//     { id: "1", title: "Create login page", description: "Implement user authentication flow", status: "Todo" },
//     { id: "2", title: "Design database schema", description: "Plan out the database structure for the application", status: "In Progress" },
//     { id: "3", title: "Set up project repository", description: "Initialize Git repo and set up project structure", status: "Done" },
//   ])
    const{tasks,createTask,updateTask,deleteTask,loading,error}=useTasks()
  const [newTask, setNewTask] = React.useState<Omit<Task, 'id'>>({ title: "", description: "", status: "To Do" ,priority:"Low"})
  const [editingTask, setEditingTask] = React.useState<Task | null>(null)
console.log(tasks);

  const handleAddTask = async() => {
    if (newTask.title.trim() === "") return
    try {
        await createTask(newTask);
        setNewTask({ title: "", description: "", status: "To Do" ,priority:"High"})
    } catch (error) {
        console.error(error)

    }
  }

  const handleDeleteTask = async(id: string) => {

try {
    await deleteTask(id)
} catch (error) {
    console.log(error);
    
}}

//   const startEditingTask = (task: Task) => {
//     setEditingTask(task)
//   }

//   const saveEditedTask = () => {
//     if (editingTask) {
//       setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)))
//       setEditingTask(null)
//     }
//   }
const handleUpdateTask = async () => {
    if (!editingTask) return
    try {
      await updateTask(editingTask.id, editingTask) // Using updateTask from hook
      setEditingTask(null)
    } catch (error) {
      console.error(error)
    }
  }


  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "To Do":
        return "text-blue-500"
      case "In Progress":
        return "text-yellow-500"
      case "Completed":
        return "text-green-500"
      default:
        return ""
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>All Tasks</CardTitle>
        <CardDescription>Manage your tasks in one place</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading tasks...</p>}
        {error && <p>{error}</p>}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {Array.isArray(tasks) && tasks.map((task) => (
    <TableRow key={task._id}>
      <TableCell>{task.title}</TableCell>
      <TableCell>{task.description}</TableCell>
      <TableCell>
        <span className={`font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </TableCell>
      <TableCell>{task.priority}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setEditingTask(task)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDeleteTask(task._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new task here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  onValueChange={(value: any) => setNewTask({ ...newTask, status: value })}
                  defaultValue={newTask.status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTask}>Save Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>

       {/* Edit Task Dialog  */}
      {editingTask && (
        <Dialog open={editingTask !== null} onOpenChange={() => setEditingTask(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Make changes to your task here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  onValueChange={(value: any) => setEditingTask({ ...editingTask, status: value })}
                  defaultValue={editingTask.status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateTask}>Save Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}