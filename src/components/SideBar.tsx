"use client"
import React, { useState } from "react";
import { FiHome, FiFolder, FiUsers, FiCalendar, FiBarChart2, FiChevronDown, FiChevronUp, FiPlusCircle } from "react-icons/fi";
import { Button } from "./ui/button";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [expandedProject, setExpandedProject] = useState(null);

  const navItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Projects", icon: <FiFolder /> },
    { name: "Teams", icon: <FiUsers /> },
    { name: "Calendar", icon: <FiCalendar /> },
    { name: "Reports", icon: <FiBarChart2 /> },
  ];

//   const projects = [
//     { id: 1, name: "Project Alpha", progress: 75 },
//     { id: 2, name: "Project Beta", progress: 30 },
//     { id: 3, name: "Project Gamma", progress: 50 },
//   ];

  const toggleProject = (id:any) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </div>
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveLink(item.name)}
                className={`w-full flex items-center p-2 rounded-lg transition-colors duration-200 ${
                  activeLink === item.name
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
             
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
          <FiPlusCircle className="mr-2" />
          New Task
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
