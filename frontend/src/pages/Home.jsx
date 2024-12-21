import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to xMasHack</h1>
      <p className="text-lg mb-6 text-center max-w-xl">
        Dive into a world of 3D visuals, roadmaps, and amazing features. Explore our platform to see what's in store for you.
      </p>
      <div className="flex space-x-4">
        <Link to="/roadmap" className="px-6 py-2 bg-lime-500 text-black font-semibold rounded hover:bg-lime-600">
          Explore Roadmap
        </Link>
        <Link to="/about" className="px-6 py-2 bg-blue-500 text-black font-semibold rounded hover:bg-blue-600">
          Learn More About Us
        </Link>
      </div>
    </div>
  );
};

export default Home;
