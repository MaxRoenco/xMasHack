import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Settings, MessageSquare, Code, Map, Cat } from 'lucide-react';

const SideBar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { 
      icon: Home, 
      path: '/',
      label: 'Home',
    },
    { 
      icon: MessageSquare, 
      path: '/chat', 
      label: 'Chat',
    },
    { 
      icon: Code, 
      path: '/editor', 
      label: 'Code Editor',
    },
    { 
      icon: Map, 
      path: '/roadmap', 
      label: 'Road map',
    },
    { 
      icon: Cat, 
      path: '/kikitok', 
      label: 'KikiTok',
    },
  ];

  return (
    <nav className="fixed top-0 left-0 h-screen w-16 bg-gray-900 flex flex-col items-center py-8 space-y-8 z-50">
      <Menu className="w-6 h-6 text-purple-500 hover:text-purple-400 cursor-pointer" />
      
      <div className="space-y-6">
        {navItems.map(({ icon: Icon, path, label }) => (
          <a 
            key={path}
            href={path}
            className="block"
            aria-label={label}
            onClick={(e) => {
              if (location.pathname !== path) {
                e.preventDefault();
                window.location.href = path;
              }
            }}
          >
            <Icon 
              className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                isActive(path) 
                  ? 'text-purple-500' 
                  : 'text-gray-400 hover:text-purple-400'
              }`}
            />
          </a>
        ))}
      </div>
      
      <div className="mt-auto">
        <a 
          href="/settings"
          aria-label="Settings"
          onClick={(e) => {
            if (location.pathname !== '/settings') {
              e.preventDefault();
              window.location.href = '/settings';
            }
          }}
        >
          <Settings 
            className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
              isActive('/settings') 
                ? 'text-purple-500' 
                : 'text-gray-400 hover:text-purple-400'
            }`}
          />
        </a>
      </div>
    </nav>
  );
};

export default SideBar;