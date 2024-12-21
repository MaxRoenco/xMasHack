import React from "react";

const HomePage = () => {
  return (
    <div className="bg-dark text-white min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6">
        <div className="text-2xl font-bold text-gradient">KiKi Mentor</div>
        <nav className="flex space-x-6">
          <a href="#features" className="hover:text-gradient">Features</a>
          <a href="#roadmap" className="hover:text-gradient">Roadmap</a>
          <a href="#contact" className="hover:text-gradient">Contact</a>
        </nav>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md text-white shadow-md hover:opacity-90">
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-8">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to <span className="text-gradient">KiKi Mentor</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Learn and grow with our AI-powered mentorship platform. Get guided on partially completed projects, enhance your skills, and prepare for your next big opportunity.
        </p>
        <button className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md text-white shadow-lg hover:opacity-90">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-8 bg-dark-light">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
          Why Choose KiKi Mentor?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-dark rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gradient">Personalized Roadmaps</h3>
            <p className="text-gray-300">
              Get tailored project plans based on your skills and goals.
            </p>
          </div>
          <div className="p-6 bg-dark rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gradient">AI Mentorship</h3>
            <p className="text-gray-300">
              Work with KiKi, our AI mentor, for real-time guidance and best practices.
            </p>
          </div>
          <div className="p-6 bg-dark rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gradient">Live Code Editor</h3>
            <p className="text-gray-300">
              Code directly on our platform with built-in project visualization.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Your Learning Roadmap</h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto">
          Choose your specialty and start building projects at your own pace, with KiKi guiding you every step of the way.
        </p>
        {/* Placeholder for the Roadmap Visualization */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-64 rounded-lg"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 text-center text-gray-500 bg-dark-light">
        <p>© 2023 KiKi Mentor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
