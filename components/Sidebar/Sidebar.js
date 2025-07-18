"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./Sidebar.css";

import frame1 from "../images/Frame (1).png";
import frame3 from "../images/Frame (3).png";
import frame4 from "../images/Frame (4).png";
import frame5 from "../images/Frame (5).png";
import frame8 from "../images/Frame (8).png";
import Dashboard from "@/app/dashboard/page";

// Sidebar item list
const Dashboardicon = frame1;
const items = [
  { label: "Dashboard", icon: frame1, path: "/dashboard" },
  { label: "Calender", icon: frame8, path: "/calendar" },
  { label: "Appointments", icon: frame3, path: "/appointment" },
  { label: "Procedure Type", icon: frame5, path: "/proceduretype" },
  { label: "Lab", icon: frame5, path: "/lab" },
  { label: "Doctors", icon: frame4, path: "/doctor" },
  { label: "Drug", icon: frame3, path: "/drug" },
];

// Utility to assign unique tour IDs
const getTourId = (label) => {
  switch (label) {
    case "Doctors":
      return "sidebar-doctor";
    case "Calender":
      return "sidebar-calendar";
    case "Appointments":
      return "sidebar-appointments";
    case "Lab":
      return "sidebar-lab";
    case "Drug":
      return "sidebar-drug";
    default:
      return null;
  }
};

const Sidebar = ({ isOpen, onToggleSidebar, sidebarOpen }) => {
  const pathname = usePathname(); // current route

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button
        className="sidebar-btn d-flex justify-content-center"
        onClick={onToggleSidebar}
      >
        {sidebarOpen ? "X" : "☰"}
      </button>

      {items.map((item, index) => {
        const tourId = getTourId(item.label);

        return (
          <Link href={item.path} key={index}>
            <div
              className={`sidebar-btn ${
                pathname === item.path ? "active" : ""
              }`}
              id={tourId ? tourId : undefined} // ✅ only add id if needed
            >
              <Image
                src={item.icon}
                alt={item.label}
                className={`menu-icon ${
                  item.label === "Dashboard" ? "icon-filter" : ""
                }`}
                width={20}
                height={20}
              />
              {isOpen && <span className="label-text">{item.label}</span>}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
