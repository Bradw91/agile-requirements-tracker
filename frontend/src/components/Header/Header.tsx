import React from "react";
import { FiSearch, FiBell, FiUser, FiSettings } from "react-icons/fi";
import { useState, useRef } from "react";
import UserOptions from "./UserOptions";
import Settings from "./Settings";
import Notifications from "./Notifications";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Header: React.FC = () => {
  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const userOptionsRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useOutsideClick(userOptionsRef, () => setIsUserOptionsOpen(false));
  useOutsideClick(settingsRef, () => setIsSettingsOpen(false));
  useOutsideClick(notificationsRef, () => setIsNotificationsOpen(false));

  // later need to pull user from API on login
  const user = {
    firstName: "Brad",
    lastName: "Willard",
    email: "brad.willard@test.com",
    // profilePicture: "https://example.com/jane.jpg", // optional
  };

  const toggleUserOptions = () => {
    setIsUserOptionsOpen(!isUserOptionsOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <header className=" h-16 bg-white flex items-center px-6 shadow-md">
      {/* Logo */}
      <div className="text-forestGreen font-bold text-xl">Agi</div>

      {/* Search Bar */}

      <div className="flex-1 mx-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a project..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-forestGreen"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-forestGreen text-white px-3 py-1 rounded-lg hover:bg-darkForestGreen transition-colors duration-200 text-sm">
            Create
          </button>
        </div>
      </div>
      {/* Right Icons */}
      <div className="flex items-center space-x-4 text-forestGreen">
        <div ref={notificationsRef}>
          <FiBell
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              toggleNotifications();
              setIsUserOptionsOpen(false);
              setIsSettingsOpen(false);
            }}
          />
          <Notifications isOpen={isNotificationsOpen} />
        </div>
        <div ref={settingsRef}>
          <FiSettings
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              toggleSettings();
              setIsUserOptionsOpen(false);
              setIsNotificationsOpen(false);
            }}
          />
          <Settings isOpen={isSettingsOpen} />
        </div>
        <div ref={userOptionsRef}>
          <FiUser
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              toggleUserOptions();
              setIsSettingsOpen(false);
              setIsNotificationsOpen(false);
            }}
          />
          <UserOptions isOpen={isUserOptionsOpen} user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
