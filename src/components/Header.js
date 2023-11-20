import React from "react";
import icon from "../images/icon.png";
import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header(props) {
  return (
    <header
      id="headerId"
      className={
        props.homePage
          ? "flex w-full justify-between items-center px-5 lg:px-10 py-5 top-0 z-[101] fixed font-medium drop-shadow bg-transparent text-white transition-five"
          : "backdrop-filter backdrop-blur-sm flex w-full justify-between items-center px-5 lg:px-10 py-5 top-0 z-[101] fixed font-medium text-gray-900 transition-five"
      }
      style={{ fontWeight: "600", fontSize: "1.1rem" }}
    >
      <div class="flex items-center gap-4">
        <div>
          <span
            className="headerSpan"
            style={{ width: "3.2rem", top: "1.2px" }}
          >
            {/* <span className='headerSpan1'>
              <img className='headerImg' alt="" aria-hidden="true" src={icon}/>
            </span> */}
            <img alt="logo" src={icon} class="cursor-pointer headerImg" />
          </span>
        </div>
        <div class="text-xl font-semibold cursor-pointer hover:border-b-2 hover:border-b-primary transition-one border-b-2 border-b-primary">
          <div>
            <span className="headerSpan" style={{ width: "10rem" }}>
              <img
                alt="logo"
                src={props.productName}
                class="cursor-pointer headerImg"
              />
            </span>
          </div>
        </div>
      </div>

      <nav
        class="hidden lg:flex lg:flex-[.8] xl:flex-[.6]"
        style={{ flexGrow: "0.6" }}
      >
        <ul class="flex flex-1 gap-2 items-center justify-between">
          <li class="hover:border-b-2 hover:border-b-primary transition-one ">
            <Link to="/">Home</Link>
          </li>
          <li class="hover:border-b-2 hover:border-b-primary transition-one ">
            <Link to="/">About</Link>
          </li>
          <li class="hover:border-b-2 hover:border-b-primary transition-one ">
            <Link to="/form">Personalized Score</Link>
          </li>
          <li class="hover:border-b-2 hover:border-b-primary transition-one ">
            <Link to="/schemes">Schemes</Link>
          </li>
          <li>
            <button
              class="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-green-800"
              style={{ fontWeight: "600", fontSize: "0.96rem" }}
            >
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Contact Us
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
