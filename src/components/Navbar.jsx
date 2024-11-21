import React from "react";
import Logo from "../assets/netflix-logo.png";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiArrowSortedDown } from "react-icons/ti";

function Navbar() {
  return (
    <div>
      <div>
        <img src={Logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div>
        <FiSearch />
        <p>children</p>
        <FaRegBell />
        <div>
          <CgProfile />
          <TiArrowSortedDown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
