import React from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  storyPoints: number;
  assignee: string;
  priority: string;
  status:
    | "todo"
    | "inprogress"
    | "UAT Testing"
    | "Failed UAT Testing"
    | "Ready for MTP"
    | "done";
  type: "User Story" | "Defect" | "Spike";
}

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-red-800";
      case "Medium":
        return "bg-yellow-500 text-yellow-800";
      case "Low":
        return "bg-green-500 text-green-800";
      default:
        return "bg-gray-500 text-gray-800";
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-3 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-gray-600">{task.type}</span>
        <span
          className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <h3 className="font-semibold text-gray-800 mb-2 text-sm leading-tight">
        {task.title}
      </h3>

      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {task.storyPoints} Points
          </div>
        </div>
        <div className="text-gray-600 truncate max-w-20">{task.assignee}</div>
      </div>
    </div>
  );
};

export default TaskCard;
