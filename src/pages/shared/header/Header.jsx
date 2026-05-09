import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (

    <div className="navbar bg-base-100 shadow-sm px-3 sm:px-6 relative">

      {/* Left */}
      <div className="flex-1">

        <NavLink
          to="/"
          className="btn btn-ghost text-lg sm:text-xl"
        >
          Parent App
        </NavLink>

      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">

        <ul className="menu menu-horizontal px-1 gap-1">

          <li>
            <NavLink to="/Blogs">
              Blogs
            </NavLink>
          </li>

          <li>
            <NavLink to="">
              Link 1
            </NavLink>
          </li>

          <li>
            <NavLink to="/CalmTool">
              Calm Tools
            </NavLink>
          </li>

          <li>
            <NavLink to="/Aboutus">
              About Us
            </NavLink>
          </li>

        </ul>

      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">

        <button
          className="btn btn-ghost btn-circle"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >

          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />

          </svg>

        </button>

      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (

        <div className="absolute top-16 right-3 bg-base-100 border border-base-300 rounded-xl shadow-lg w-52 z-50 md:hidden">

          <ul className="menu p-2">

            <li>
              <NavLink to="/Blogs">
                Blogs
              </NavLink>
            </li>

            <li>
              <NavLink to="">
                Link 1
              </NavLink>
            </li>

            <li>
              <NavLink to="/CalmTool">
                Calm Tools
              </NavLink>
            </li>

            <li>
              <NavLink to="/Aboutus">
                About Us
              </NavLink>
            </li>

          </ul>

        </div>
      )}

    </div>
  );
};

export default Header;