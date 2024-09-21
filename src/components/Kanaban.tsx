"use client"

import * as React from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { Plus, MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Task {
  id: string
  content: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const initialData: { columns: Column[] } = {
  columns: [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "task-1", content: "Create login page" },
        { id: "task-2", content: "Design database schema" },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        { id: "task-3", content: "Implement user authentication" },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        { id: "task-4", content: "Set up project repository" },
      ],
    },
  ],
}

export default function KanbanBoard() {
  const [columns, setColumns] = React.useState(initialData.columns)
  const [newTask, setNewTask] = React.useState("")

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) {
      return
    }

    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      const column = columns.find((col) => col.id === source.droppableId)
      if (column) {
        const newTasks = Array.from(column.tasks)
        const [reorderedItem] = newTasks.splice(source.index, 1)
        newTasks.splice(destination.index, 0, reorderedItem)

        const newColumns = columns.map((col) =>
          col.id === source.droppableId ? { ...col, tasks: newTasks } : col
        )
        setColumns(newColumns)
      }
    } else {
      // Moving from one list to another
      const sourceColumn = columns.find((col) => col.id === source.droppableId)
      const destColumn = columns.find((col) => col.id === destination.droppableId)
      if (sourceColumn && destColumn) {
        const sourceTasks = Array.from(sourceColumn.tasks)
        const destTasks = Array.from(destColumn.tasks)
        const [movedItem] = sourceTasks.splice(source.index, 1)
        destTasks.splice(destination.index, 0, movedItem)

        const newColumns = columns.map((col) => {
          if (col.id === source.droppableId) {
            return { ...col, tasks: sourceTasks }
          }
          if (col.id === destination.droppableId) {
            return { ...col, tasks: destTasks }
          }
          return col
        })
        setColumns(newColumns)
      }
    }
  }

  const addNewTask = (columnId: string) => {
    if (newTask.trim() === "") return

    const newTaskItem: Task = {
      id: `task-${Date.now()}`,
      content: newTask,
    }

    const newColumns = columns.map((col) =>
      col.id === columnId
        ? { ...col, tasks: [...col.tasks, newTaskItem] }
        : col
    )

    setColumns(newColumns)
    setNewTask("")
  }

  const deleteTask = (columnId: string, taskId: string) => {
    const newColumns = columns.map((col) =>
      col.id === columnId
        ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
        : col
    )
    setColumns(newColumns)
  }

  return (
    <div className="p-4 h-screen bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap gap-4">
          {columns.map((column) => (
            <div key={column.id} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.75rem)]">
              <Card>
                <CardHeader>
                  <CardTitle>{column.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[200px]"
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-muted p-4 mb-2 rounded-md shadow-sm"
                              >
                                <div className="flex justify-between items-center">
                                  <span>{task.content}</span>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => deleteTask(column.id, task.id)}>
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                 
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}