import React, { useMemo } from "react";

interface UserOptionsProps {
  isOpen: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string; // Optional profile picture URL
  };
}

const UserOptions: React.FC<UserOptionsProps> = ({ isOpen, user }) => {
  const initials = `${user.firstName[0] || ""}${user.lastName[0] || ""}`;

  const bgColor = useMemo(() => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  if (!isOpen) return null;

  return (
    <div className="absolute right-6 top-16 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
      {/* Profile Info */}
      <div className="flex items-center space-x-3 border-b pb-3 mb-3">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg ${bgColor}`}
          >
            {initials}
          </div>
        )}
        <div>
          <p className="font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Menu Options */}
      <ul className="space-y-2">
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
          Profile
        </li>
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
          Account Settings
        </li>
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">Theme</li>
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer text-red-500">
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default UserOptions;
