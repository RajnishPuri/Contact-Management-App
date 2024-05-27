import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './active.css'; // Assuming this is for styling active links
import logo from '../Taiyo-logo.png'; // Assuming this is your logo image

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div>
      {/* CSS styles for animations and responsiveness */}
      <style>{`
        /* Keyframe animation for a blinking shadow effect */
        @keyframes blink-shadow {
          0%, 100% {
            box-shadow: 0px 0px 10px 8px #F0564F;
          }
          50% {
            box-shadow: none;
          }
        }
        .blink-shadow {
          animation: blink-shadow 3s infinite;
        }

        /* Hide the menu icon on desktop */
        .menu-icon {
          display: none;
        }

        /* Responsive styles for mobile devices */
        @media (max-width: 1000px) {
          /* Hide the desktop menu */
          .desktop-menu {
            display: none;
          }

          /* Show the menu icon */
          .menu-icon {
            display: block;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 10px;
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 1100; /* Higher than mobile menu */
          }

          /* Styles for the mobile menu */
          .mobile-menu {
            display: ${isMenuOpen ? 'block' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            width: 60%; /* Adjust the width as needed */
            height: 100%;
            background-color: #07101F;
            z-index: 1000;
            padding: 20px;
            animation: slide-in 0.3s forwards;
          }

          /* Animation for sliding in the mobile menu */
          @keyframes slide-in {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
        }
      `}</style>

      {/* Mobile Menu Icon */}
      <div className="menu-icon md:hidden" onClick={toggleMenu}>
        &#9776; {/* Unicode hamburger icon */}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden z-1001`}>
        <div className="overflow-hidden w-full h-2/5 flex items-center justify-center">
          <img className="w-2/3" src={logo} alt="Logo" />
        </div>
        <ul className="text-white text-center p-1">
          <hr />
          <NavLink to={"/"} onClick={toggleMenu}>
            <li className="p-2 hover:text-[#F0564F] hover:tracking-widest duration-300 font-light cursor-pointer">
              Contact
            </li>
          </NavLink>
          <hr />
          <NavLink to={"/chartMaps"} onClick={toggleMenu}>
            <li className="p-2 hover:text-[#F0564F] hover:tracking-widest duration-300 font-light cursor-pointer">
              Charts
            </li>
          </NavLink>
          <hr />
        </ul>
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu w-60 bg-[#07101F] h-screen fixed blink-shadow flex flex-col md:relative">
        <div className="overflow-hidden w-full h-2/5 left-5 flex items-center justify-center">
          <img className="w-2/3" src={logo} alt="Logo" />
        </div>
        <div className="w-full">
          <ul className="text-white text-center p-1">
            <hr />
            <NavLink to={"/"}>
              <li className="p-2 hover:text-[#F0564F] hover:tracking-widest duration-300 font-light cursor-pointer">
                Contact
              </li>
            </NavLink>
            <hr />
            <NavLink to={"/chartMaps"}>
              <li className="p-2 hover:text-[#F0564F] hover:tracking-widest duration-300 font-light cursor-pointer">
                Charts
              </li>
            </NavLink>
            <hr />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
