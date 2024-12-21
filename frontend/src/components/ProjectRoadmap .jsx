import React, { useState } from 'react';
import { Star, Lock, Check, Code, Brain, Keyboard, Mouse, Monitor, Command, FileCode, Globe, Database, Terminal, Sparkles } from 'lucide-react';

const SmoothPath = () => {
  return (
    <div className="relative">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 600">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="1"/>
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.4"/>
          </linearGradient>
          {/* Animated dash pattern */}
          <pattern id="pathPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="#7c3aed" className="animate-pulse"/>
          </pattern>
        </defs>
        {/* Background glow path */}
        <path
          d="M 50,300 
             C 200,300 300,200 400,200 
             C 600,200 650,400 800,400 
             C 950,400 1000,300 1100,300"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="24"
          strokeLinecap="round"
          filter="url(#glow)"
          className="path-glow"
        />
        {/* Animated overlay path */}
        <path
          d="M 50,300 
             C 200,300 300,200 400,200 
             C 600,200 650,400 800,400 
             C 950,400 1000,300 1100,300"
          fill="none"
          stroke="url(#pathPattern)"
          strokeWidth="4"
          strokeLinecap="round"
          className="path-animation"
        />
      </svg>
    </div>
  );
};

const ProjectRoadmap = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  
  const levels = [
    { id: 1, title: 'Setup Basics', status: 'completed', stars: 3, icon: Terminal },
    { id: 2, title: 'First Component', status: 'completed', stars: 2, icon: Code },
    { id: 3, title: 'State Management', status: 'active', stars: 0, icon: Brain },
    { id: 4, title: 'API Integration', status: 'locked', stars: 0, icon: Globe },
    { id: 5, title: 'Authentication', status: 'locked', stars: 0, icon: Lock },
    { id: 6, title: 'Database Design', status: 'locked', stars: 0, icon: Database },
    { id: 7, title: 'Advanced Features', status: 'locked', stars: 0, icon: Command },
    { id: 8, title: 'Testing', status: 'locked', stars: 0, icon: FileCode },
    { id: 9, title: 'Deployment', status: 'locked', stars: 0, icon: Globe },
    { id: 10, title: 'Final Challenge', status: 'locked', stars: 0, icon: Sparkles },
  ];

  const decorativeElements = [
    { icon: Keyboard, position: 'top-20 left-20', rotation: '15deg', size: 48 },
    { icon: Mouse, position: 'top-40 right-20', rotation: '-10deg', size: 40 },
    { icon: Monitor, position: 'bottom-20 left-1/4', rotation: '5deg', size: 56 },
    { icon: FileCode, position: 'top-1/3 right-1/3', rotation: '-20deg', size: 44 },
    { icon: Terminal, position: 'bottom-40 right-1/4', rotation: '25deg', size: 48 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8 overflow-hidden">
      {/* Decorative Background Elements */}
      {decorativeElements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.position} transform opacity-10 hover:opacity-20 transition-opacity duration-300`}
          style={{ transform: `rotate(${element.rotation})` }}
        >
          <element.icon size={element.size} className="text-violet-400" />
        </div>
      ))}
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-violet-300 mb-4">Coding Adventure Map</h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-violet-900/30 rounded-lg px-4 py-2 flex items-center">
              <Brain className="w-5 h-5 text-violet-400 mr-2" />
              <span className="text-violet-300">KiKi - Your Coding Mentor</span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative">
          <SmoothPath />

          {/* Level Markers */}
          <div className="relative z-10 grid grid-cols-5 gap-24 px-12 py-24">
            {levels.map((level) => (
              <div
                key={level.id}
                className={`transform transition-all duration-300 ${
                  currentLevel === level.id ? 'scale-110' : ''
                }`}
                onClick={() => setCurrentLevel(level.id)}
              >
                {/* Level Node */}
                <div
                  className={`w-24 h-24 rounded-2xl relative cursor-pointer transition-all duration-300 
                    ${level.status === 'locked'
                      ? 'bg-gray-800/50 border-gray-700'
                      : level.status === 'completed'
                      ? 'bg-violet-900/50 border-violet-500 shadow-lg shadow-violet-500/20'
                      : 'bg-violet-700/50 border-violet-400 animate-pulse'
                    } border-2 backdrop-blur-sm`}
                >
                  {/* Level Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <level.icon className={`w-10 h-10 ${
                      level.status === 'locked' 
                        ? 'text-gray-500' 
                        : level.status === 'completed'
                        ? 'text-violet-400'
                        : 'text-violet-300'
                    }`} />
                  </div>

                  {/* Stars */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < level.stars ? 'text-yellow-400 animate-bounce' : 'text-gray-600'
                        }`}
                        fill={i < level.stars ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>

                  {/* Level Title */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-lg font-bold text-violet-300 mb-1">
                      {level.id}
                    </div>
                    <div className="text-sm text-violet-400 whitespace-nowrap">
                      {level.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* KiKi's Hint Box */}
          {/* <div className="absolute bottom-0 right-0 w-72 bg-violet-900/20 border border-violet-500/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <Brain className="w-6 h-6 text-violet-400 flex-shrink-0 animate-pulse" />
              <div>
                <h4 className="text-violet-300 font-semibold mb-1">KiKi's Hint</h4>
                <p className="text-gray-300 text-sm">
                  Complete each level to earn stars and unlock new challenges. 
                  I'll guide you through best practices along the way!
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <style jsx>{`
        .path-glow {
          filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.5));
        }
        .path-animation {
          stroke-dasharray: 20;
          animation: dash 20s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 1000;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectRoadmap;