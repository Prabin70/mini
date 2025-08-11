import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import About from "../../components/landing/About";

const AboutUs = () => {
  const ACCENT_GREEN = "#00C27C";
  const ACCENT_ORANGE = "#F5A623";
  const DARK_TEXT_COLOR = "#1E252C";
  const PARAGRAPH_TEXT_COLOR = "#6B7280";
  const SECTION_BACKGROUND_COLOR = "#FFFFFF";
  const IMAGE_BACKGROUND_COLOR = "#F5F5F5";

  return (
    <>
      <title>About us || E-learning</title>
      <section
        className="py-16  sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
        style={{ backgroundColor: SECTION_BACKGROUND_COLOR }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1
              className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight"
              style={{ color: ACCENT_GREEN }}
            >
              About Us
            </h1>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 leading-tight"
              style={{ color: DARK_TEXT_COLOR }}
            >
              <span style={{ color: ACCENT_ORANGE }}>WEEKEND UX</span> Providing
              The Best Opportunities To The
              <br className="hidden md:inline" />
              Students Around The Glob.
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed mb-8"
              style={{ color: PARAGRAPH_TEXT_COLOR }}
            >
              Weekend UX, is a UI/UX Design Academy in Delhi involved in User
              Experience and User Interface Training and Consulting. It was
              started in 2023 and passionate towards User Interface Design/ User
              Experience Design, Human Computer Interaction Design. Humanoid is
              gushing towards competence to acquire knowledge and have a wide
              understanding towards the sphere through the foremost courses in
              the area of UI/UX Design, by strengthening up your skills, for
              your golden future
            </p>
            <a
              href={"/contact"}
              className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow-md font-semibold text-white flex items-center justify-center gap-2
                       transition-all duration-200 hover:opacity-90 mx-auto lg:mx-0 text-sm sm:text-base"
              style={{ backgroundColor: ACCENT_GREEN }}
            >
              Join Us <IoIosArrowForward className="text-base sm:text-lg" />
            </a>
          </div>

          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center gap-6 relative lg:h-[600px] mt-8 lg:mt-0">
            <div
              className="hidden lg:block absolute rounded-3xl shadow-lg inset-5"
              style={{ backgroundColor: IMAGE_BACKGROUND_COLOR }}
            ></div>

            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Office Hallway"
              className="w-full max-w-md h-auto rounded-xl shadow-xl object-cover 
                       lg:absolute lg:z-10 lg:w-[75%] lg:h-[45%] lg:top-0 lg:right-0 lg:max-w-none"
            />
            <img
              src="https://images.unsplash.com/photo-1562097365-e24bb4c0479c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="People working on laptops"
              className="w-full max-w-md h-auto rounded-xl shadow-xl object-cover   
                       lg:absolute lg:z-20 lg:w-[75%] lg:h-[45%] lg:bottom-0 lg:left-0 lg:max-w-none"
            />
          </div>
        </div>
      </section>
      <About />
    </>
  );
};

export default AboutUs;
