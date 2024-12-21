import React from 'react';
import Roadmap from '../components/Roadmap/Roadmap';

const RoadmapPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-white text-3xl font-bold mb-6">
        Roadmap
      </h1>
      <div className="w-full h-full">
        <Roadmap />
      </div>
    </div>
  );
};

export default RoadmapPage;
