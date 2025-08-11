import React from "react";

const ELEARNING_IMAGES = {
  studentsWithLaptop:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  personWriting:
    "https://images.unsplash.com/photo-1612550761236-e813928f7271?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  onlineClass:
    "https://images.unsplash.com/photo-1711097383282-28097ae16b1d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const About = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none">
          <div className="flex w-full flex-col items-center gap-x-16 gap-y-10 lg:flex-row">
            <div className="lg:w-1/2 lg:pr-4 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Unlock Your Potential
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Dive into a world of knowledge with our interactive courses.
                Designed for all levels, our platform helps you learn at your
                own pace, anytime, anywhere.
              </p>
            </div>
            <div className="relative h-80 w-full lg:w-1/2">
              <img
                src={ELEARNING_IMAGES.studentsWithLaptop}
                alt="Students learning on a laptop"
                className="absolute top-0 right-0 h-[75%] w-[65%] rounded-2xl bg-gray-50 object-cover shadow-xl"
              />
              <img
                src={ELEARNING_IMAGES.personWriting}
                alt="Person writing notes in a book"
                className="absolute bottom-0 left-0 h-[65%] w-[55%] rounded-2xl bg-gray-50 object-cover shadow-xl"
              />
            </div>
          </div>

          <div className="flex w-full flex-col-reverse items-center gap-x-16 gap-y-10 lg:flex-row">
            <div className="lg:w-1/2">
              <img
                src={ELEARNING_IMAGES.onlineClass}
                alt="Teacher leading an online class session"
                className="w-full max-w-lg rounded-2xl bg-gray-50 object-cover shadow-xl mx-auto"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-4 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Expert-Led Courses
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Explore a vast library of courses taught by industry veterans
                and academic pioneers. From technology and business to creative
                arts, find your passion and master new skills with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
