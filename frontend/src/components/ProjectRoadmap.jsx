import React, { useState } from 'react';
import { Star, Lock, Code, Brain, Keyboard, Mouse, Monitor, Command, FileCode, Globe, Database, Terminal, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectRoadmap = ({ challenges }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const navigate = useNavigate();

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

          {/* Level Markers */}
          <div className="relative z-10 grid grid-cols-5 gap-24 px-12 py-24">
            {challenges.map((level, i) => (
              <div
                key={i}
                className={`transform transition-all duration-300 ${
                  currentLevel === i+1 ? 'scale-110' : ''
                }`}
                onClick={() => {setCurrentLevel(i+1); navigate('/challenges/'+(i+1))}}
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
                      {i+1}
                    </div>
                    <div className="text-sm text-violet-400 whitespace-nowrap">
                      {level.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>

      <style>{`
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