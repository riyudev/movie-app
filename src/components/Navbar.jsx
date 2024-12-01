import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/netflix-logo.png";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiArrowSortedDown } from "react-icons/ti";
import { logout } from "../Firebase.js";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed flex justify-between items-center w-full px-[8%] py-6 z-10 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90"
          : "bg-gradient-to-b from-slate-950 to-transparent"
      }`}
    >
      {/* Left Section */}
      <div className="flex">
        <div className="flex items-center justify-center max-w-32 min-w-24 w-full">
          <a href="/">
            <img src={Logo} alt="Netflix Logo" />
          </a>
        </div>

        <ul className="hidden laptop:flex items-center gap-x-5 ml-10 mr-7 text-sm">
          <li className="cursor-pointer hover:text-red-600">Home</li>
          <li className="cursor-pointer hover:text-red-600">TV Shows</li>
          <li className="cursor-pointer hover:text-red-600">Movies</li>
          <li className="cursor-pointer hover:text-red-600">New & Popular</li>
          <li className="cursor-pointer hover:text-red-600">My List</li>
          <li className="cursor-pointer hover:text-red-600">
            Browse by Language
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center text-white gap-x-3 tablet:gap-x-5 ml-4">
        <FiSearch className="text-sm tablet:text-xl" />
        <p className="text-xs tablet:text-sm cursor-pointer hover:text-red-600">
          Children
        </p>
        <FaRegBell className="text-sm tablet:text-xl" />

        {/* Profile Dropdown */}
        <div
          className="relative flex items-center justify-center cursor-pointer"
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          <CgProfile className="text-sm tablet:text-xl" />
          <TiArrowSortedDown className="text-sm tablet:text-2xl" />
          {isDropdownOpen && (
            <div className="absolute top-full right-0 w-max bg-gray-500 place-items-center gap-y-2 mt-2 py-[3px] px-[6px] tablet:py-[5px] tablet:px-[10px] rounded-[2px] z-10">
              <p
                onClick={() => {
                  logout();
                }}
                className="text-xs tablet:text-sm cursor-pointer hover:bg-gray-700 p-2 rounded underline"
              >
                Sign Out
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
