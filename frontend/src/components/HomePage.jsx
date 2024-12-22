import React from 'react';
import { Code, Brain, Layout, GitBranch, Terminal, Sparkles } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6 text-purple-400" />,
      title: "Real Projects, Real Learning",
      description: "Complete 80% finished projects from GitHub. Fill in the missing pieces and learn by doing."
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      title: "AI Mentor KiKi",
      description: "Get guidance from KiKi, your AI senior developer mentor who helps with best practices and implementation."
    },
    {
      icon: <Layout className="w-6 h-6 text-purple-400" />,
      title: "Integrated Code Editor",
      description: "Code directly in your browser with our powerful integrated development environment."
    }
  ];

  const specialties = [
    { name: "Machine Learning", icon: <Brain className="w-8 h-8" /> },
    { name: "Frontend Development", icon: <Layout className="w-8 h-8" /> },
    { name: "Backend Development", icon: <Terminal className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      {/* Hero Section */}
      <div className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Learn Development with AI Mentorship
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Complete real-world projects with guidance from KiKi, your AI mentor. Choose your specialty, pick your projects, and level up your skills.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Learning
              </button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                View Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-purple-900/30 rounded-lg">
                  {specialty.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{specialty.name}</h3>
                <p className="text-gray-400">Master {specialty.name.toLowerCase()} through hands-on project completion</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">Join our community of learners and build your portfolio with real projects.</p>
          <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;