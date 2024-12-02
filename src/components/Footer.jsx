import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const footerLinks = [
    "Audio Description",
    "Help Centre",
    "Gift Cards",
    "Media Centre",
    "Investor Relations",
    "Jobs",
    "Terms of Use",
    "Privacy",
    "Legal Notices",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
  ];

  return (
    <footer className="flex justify-center py-5 mt-20">
      <div className="space-y-4">
        <div className="flex items-center gap-x-3 w-full text-white">
          <FaFacebookF className="text-[35px] hover:text-red-600 cursor-pointer" />
          <FaInstagram className="text-[35px] hover:text-red-600 cursor-pointer" />
          <FaXTwitter className="text-[35px] hover:text-red-600 cursor-pointer" />
          <FaYoutube className="text-[42px] hover:text-red-600 cursor-pointer" />
        </div>
        <ul className="grid grid-cols-3 text-sm gap-3 gap-x-20">
          {footerLinks.map((link, index) => (
            <li key={index} className="cursor-pointer hover:text-red-600">
              {link}
            </li>
          ))}
        </ul>
        <p className="text-sm pt-5">&copy; 1997-2023 Netflix Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
