import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { isSystem, isAdmin, isUser } = useAuth();

  return (
    <div
      className="sidebar bg-dark text-white"
      style={{ width: "250px", padding: "1rem" }}
    >
      <h5 className="mb-4">Template Manager</h5>

      <ul className="nav flex-column">
        {/* Templates – visible to all */}
        <li className="nav-item mb-2">
          <NavLink
            to="/templates"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "fw-bold" : ""}`
            }
          >
            Templates
          </NavLink>
        </li>

        {/* Users – ADMIN & SYSTEM */}
        {(isAdmin || isSystem) && (
          <li className="nav-item mb-2">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "fw-bold" : ""}`
              }
            >
              Users
            </NavLink>
          </li>
        )}

        {/* Organizations – SYSTEM only */}
        {isSystem && (
          <li className="nav-item mb-2">
            <NavLink
              to="/organizations"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "fw-bold" : ""}`
              }
            >
              Organizations
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
