import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/netflix-logo.png";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiArrowSortedDown } from "react-icons/ti";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="fixed flex justify-between items-center bg-gradient-to-b from-slate-950 to-transparent w-full px-[8%] py-8 z-10">
      {/* Left Section */}
      <div className="flex">
        <div className="flex items-center justify-center max-w-32 min-w-24 w-full">
          <img src={Logo} alt="Netflix Logo" />
        </div>

        <ul className="hidden laptop:flex items-center gap-x-5 ml-10 mr-7 text-sm">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center text-white gap-x-3 tablet:gap-x-5 ml-4">
        <FiSearch className="text-sm tablet:text-xl" />
        <p className="text-xs tablet:text-base">Children</p>
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
              <p className="text-xs tablet:text-base cursor-pointer hover:bg-gray-700 p-2 rounded underline">
                Sign Out
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
