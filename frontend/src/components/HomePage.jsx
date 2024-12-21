import React from 'react';


const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Sidebar Navigation */}

      {/* Main Content */}
      <main className="ml-16 p-8">
        {/* Hero Section */}
        <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 via-blue-900 to-black">
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl font-bold mb-2">Welcome to the Experience</h1>
            <p className="text-gray-300 text-lg">Discover endless entertainment possibilities</p>
          </div>
        </div>

        {/* Featured Content Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all">
                <div className="h-48 bg-gradient-to-br from-purple-800 to-blue-900" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Featured Item {item}</h3>
                  <p className="text-gray-400">Experience amazing content with our interactive platform</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;