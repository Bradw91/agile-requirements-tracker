import React from "react";

export interface UserStory {
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
}

const UserStoryCard: React.FC<{ story: UserStory }> = ({ story }) => {
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
        <span className="text-sm font-medium text-gray-600">{story.id}</span>
        <span
          className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
            story.priority
          )}`}
        >
          {story.priority}
        </span>
      </div>

      <h3 className="font-semibold text-gray-800 mb-2 text-sm leading-tight">
        {story.title}
      </h3>

      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {story.description}
      </p>

      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {story.storyPoints} SP
          </div>
        </div>
        <div className="text-gray-600 truncate max-w-20">{story.assignee}</div>
      </div>
    </div>
  );
};

export default UserStoryCard;
