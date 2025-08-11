import React from "react";
import About from "./About";
import Courses from "./Courses";
import HomePage from "./Herosection";

const LandingPage = () => {
  return (
    <div>
      <HomePage />
      <About />
      <Courses />
    </div>
  );
};

export default LandingPage;
