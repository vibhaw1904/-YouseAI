import mongoose, { Schema, model, models } from "mongoose";

export interface TaskDocument {
  _id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
  user: mongoose.Schema.Types.ObjectId; // Link the task to a user
}

const TaskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    dueDate: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  },
  { timestamps: true }
);

// Check if the Task model exists before defining it
 const Task = mongoose.models?.Task || model<TaskDocument>('Task', TaskSchema);

export default Task;
