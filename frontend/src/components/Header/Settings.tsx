import React from "react";

interface SettingsProps {
  isOpen: boolean;
}

const Settings: React.FC<SettingsProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-6 top-16 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
      <div className="p-4">
        <h3 className="font-semibold text-lg">Settings</h3>
        <div className="mt-2">
          <label className="block">
            <span className="text-gray-700">General Settings</span>
          </label>
          <label className="block">
            <span className="text-gray-700">Projects</span>
          </label>
          <label className="block">
            <span className="text-gray-700">Billing</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
