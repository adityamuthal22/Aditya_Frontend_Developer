import React from "react";

const Banner = () => {
  return (
    <div className=" sm:h-[30vh] md:h-[60vh] lg:h-[90vh] py-10 relative">
      <img
        src="https://img.freepik.com/free-vector/rocket-ship-space-background_23-2149107790.jpg"
        alt="Rocket Launching"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="container mx-auto px-4 mt-16 sm:mt-2 relative">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white font-bold">
          Welcome to SpaceX Website
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white mt-2">
          Discover the best products and services for your needs.
        </p>
        <button className="bg-white text-blue-500 font-semibold py-2 px-4 mt-4 rounded-lg hover:bg-blue-100">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Banner;
