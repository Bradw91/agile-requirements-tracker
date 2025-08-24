import React from "react";
import UserStoryCard, { type UserStory } from "./UserStoryCard";
import { useState } from "react";

const mockUserStories: UserStory[] = [
  {
    id: "US-001",
    title: "User Login Authentication",
    description:
      "As a user, I want to login securely so that I can access my dashboard",
    storyPoints: 5,
    assignee: "John Doe",
    priority: "High",
    status: "todo",
  },
  {
    id: "US-002",
    title: "Create User Profile",
    description: "As a user, I want to create and edit my profile information",
    storyPoints: 3,
    assignee: "Jane Smith",
    priority: "Medium",
    status: "todo",
  },
  {
    id: "US-003",
    title: "Dashboard Analytics",
    description: "As a user, I want to view analytics on my dashboard",
    storyPoints: 8,
    assignee: "Mike Johnson",
    priority: "High",
    status: "inprogress",
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
  },
  {
    id: "US-005",
    title: "User Settings Page",
    description: "As a user, I want to manage my account settings",
    storyPoints: 3,
    assignee: "John Doe",
    priority: "Medium",
    status: "done",
  },
];

const ScrumBoard: React.FC = () => {
  const [userStories] = useState<UserStory[]>(mockUserStories);

  const todoStories = userStories.filter((story) => story.status === "todo");
  const inProgressStories = userStories.filter(
    (story) => story.status === "inprogress"
  );
  const doneStories = userStories.filter((story) => story.status === "done");

  const columns = [
    {
      title: "To Do",
      stories: todoStories,
      count: todoStories.length,
      bgColor: "bg-gray-50",
    },
    {
      title: "In Progress",
      stories: inProgressStories,
      count: inProgressStories.length,
      bgColor: "bg-blue-50",
    },
    {
      title: "Done",
      stories: doneStories,
      count: doneStories.length,
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div>
      <h2>Scrum Board</h2>
      <p>List of user stories in the current sprint.</p>
      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.title} className={`p-4 rounded ${column.bgColor}`}>
            <h3 className="font-semibold">{column.title}</h3>
            <p className="text-sm">{column.count} stories</p>
            <div className="mt-2">
              {column.stories.map((story) => (
                <UserStoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrumBoard;
