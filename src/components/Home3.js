import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import img1 from "../images/img3.jpg"

export default function Home3(props) {
  return (
    <div className="home3">
        <img src={img1} alt="home3" style={{width: window.innerWidth, height: window.innerHeight, filter: "brightness(0.3)"}}/>
    </div>
  )
}