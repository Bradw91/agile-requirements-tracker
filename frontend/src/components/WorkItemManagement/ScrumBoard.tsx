import React from "react";
import TaskCard, { type Task } from "./TaskCard";
import { useState } from "react";

const mockTasks: Task[] = [
  {
    id: "US-001",
    title: "User Login Authentication",
    description:
      "As a user, I want to login securely so that I can access my dashboard",
    storyPoints: 5,
    assignee: "John Doe",
    priority: "High",
    status: "todo",
    type: "User Story",
  },
  {
    id: "US-002",
    title: "Create User Profile",
    description: "As a user, I want to create and edit my profile information",
    storyPoints: 3,
    assignee: "Jane Smith",
    priority: "Medium",
    status: "todo",
    type: "User Story",
  },
  {
    id: "US-003",
    title: "Dashboard Issue",
    description:
      "In production, an issue was discovered with the dashboard tile",
    storyPoints: 8,
    assignee: "Mike Johnson",
    priority: "High",
    status: "inprogress",
    type: "Defect",
  },
  {
    id: "US-004",
    title: "Email Notifications",
    description:
      "As a user, I want to receive email notifications for important updates",
    storyPoints: 2,
    assignee: "Sarah Wilson",
    priority: "Low",
    status: "inprogress",
    type: "User Story",
  },
  {
    id: "US-005",
    title: "User Settings Page",
    description: "As a user, I want to manage my account settings",
    storyPoints: 3,
    assignee: "John Doe",
    priority: "Medium",
    status: "done",
    type: "User Story",
  },
];

const ScrumBoard: React.FC = () => {
  const [tasks] = useState<Task[]>(mockTasks);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "inprogress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  const columns = [
    {
      title: "To Do",
      tasks: todoTasks,
      count: todoTasks.length,
      bgColor: "bg-gray-50",
    },
    {
      title: "In Progress",
      tasks: inProgressTasks,
      count: inProgressTasks.length,
      bgColor: "bg-blue-50",
    },
    {
      title: "Done",
      tasks: doneTasks,
      count: doneTasks.length,
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 items-stretch">
        {columns.map((column) => (
          <div key={column.title} className={`p-4 rounded ${column.bgColor}`}>
            <h3 className="font-semibold">{column.title}</h3>
            <p className="text-sm">{column.count} tasks</p>
            <div className="mt-2 flex-1">
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              <button className="w-full mt-4 py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[color:var(--color-forestGreen)] hover:text-[color:var(--color-forestGreen)] transition-colors duration-200 text-xs">
                + Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrumBoard;
