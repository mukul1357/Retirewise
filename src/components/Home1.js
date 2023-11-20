import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import img1 from "../images/img.jpeg"

export default function Home1(props) {
  return (
    <div className="home1">
        <img src={img1} alt="home1" style={{width: window.innerWidth, height: window.innerHeight, filter: "brightness(0.3)"}}/>
    </div>
  )
}
