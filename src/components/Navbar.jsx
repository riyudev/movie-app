import React, { useState } from "react";
import Logo from "../assets/netflix-logo.png";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiArrowSortedDown } from "react-icons/ti";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center max-w-full mx-[8%] py-5">
      <div className="flex space-x-10 w-[]">
        <div className="max-w-36">
          <img src={Logo} alt="" />
        </div>

        <ul className="flex items-center gap-x-5 text-nowrap text-white">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className="flex items-center justify-center gap-x-5 text-white">
        <FiSearch className="text-xl" />
        <p>children</p>
        <FaRegBell className="text-xl" />
        <div
          onClick={toggleDropdown}
          className="relative flex items-center justify-center space-x-1"
        >
          <CgProfile className="text-xl" />
          <TiArrowSortedDown className="text-2xl cursor-pointer" />
          {isDropdownOpen && (
            <div
              className="absolute top-full right-0 w-max bg-gray-500 gap-y-2 mt-2 py-[5px] px-[10px] rounded-[2px] z-10"
              style={{ minWidth: "150px" }}
            >
              <p className="cursor-pointer hover:bg-gray-700 p-2 rounded underline">
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
