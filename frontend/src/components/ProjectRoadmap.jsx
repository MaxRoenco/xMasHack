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
        { icon: Brain, position: 'top-20 left-20', rotation: '15deg', size: 48 },
        { icon: MessageCircle, position: 'top-40 right-20', rotation: '-10deg', size: 40 },
        { icon: Sparkles, position: 'bottom-20 left-1/4', rotation: '5deg', size: 56 },
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

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-violet-300 mb-4">AI Chat Assistant</h1>
                    <div className="flex items-center justify-center space-x-4">
                        <div className="bg-violet-900/30 rounded-lg px-4 py-2 flex items-center">
                            <Brain className="w-5 h-5 text-violet-400 mr-2" />
                            <span className="text-violet-300">Your AI Companion</span>
                        </div>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="bg-violet-900/30 rounded-xl shadow-lg backdrop-blur-sm border border-violet-500/20">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-violet-500/20 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-violet-400" />
                            <span className="text-violet-300 font-semibold">Chat Session</span>
                        </div>
                        <button
                            onClick={clearChat}
                            className="px-4 py-2 text-sm text-violet-300 border border-violet-500/50 rounded-lg 
                            hover:bg-violet-500/20 transition-colors"
                        >
                            Clear Chat
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="h-[50vh] p-6 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`max-w-[70%] p-4 rounded-2xl mb-4 backdrop-blur-sm
                                ${message.isUser
                                    ? 'ml-auto bg-violet-600/40 text-violet-100 rounded-br-sm border border-violet-500/30'
                                    : 'mr-auto bg-gray-800/40 text-gray-100 rounded-bl-sm border border-gray-700/30'
                                }`}
                            >
                                {message.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="max-w-[70%] p-4 rounded-2xl mb-4 bg-gray-800/40 text-gray-100 rounded-bl-sm border border-gray-700/30">
                                <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-violet-500/20">
                        <div className="flex gap-3">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message here..."
                                className="flex-1 p-3 bg-gray-800/40 text-violet-100 border border-violet-500/30 rounded-lg 
                                focus:border-violet-400 focus:outline-none transition-colors placeholder-violet-400/50"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !inputMessage.trim()}
                                className="px-6 py-3 bg-violet-600/40 text-violet-100 font-semibold rounded-lg
                                border border-violet-500/30 hover:bg-violet-500/40 transition-colors 
                                disabled:bg-gray-800/40 disabled:border-gray-700/30 disabled:text-gray-500 
                                disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectRoadmap;