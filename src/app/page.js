"use client"
import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, ChevronDownIcon, SendIcon, RocketIcon } from 'lucide-react';

const SpaceFactsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const StarField = () => {
    return (
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    );
  };

  const categories = [
    {
      title: "Planets",
      description: "Explore the mysteries of our solar system's planets and their unique characteristics.",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      title: "Galaxies",
      description: "Journey through distant galaxies and discover the vastness of our universe.",
      gradient: "from-pink-600 to-purple-600"
    },
    {
      title: "Space Technology",
      description: "Learn about the latest advances in space exploration technology.",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "Quantum Physics",
      description: "Dive into the fascinating world of quantum mechanics and particle physics.",
      gradient: "from-cyan-600 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <StarField />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black bg-opacity-90 backdrop-blur-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <RocketIcon className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">SpaceFacts</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Categories', 'Newsletter', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-lg">
              <div className="flex flex-col space-y-4 py-4">
                {['Home', 'Categories', 'Newsletter', 'About'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-white hover:text-blue-400 px-4 py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/background/astronaut_waving.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-gray-900" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Explore the Wonders of the
            <span className="block bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
              Universe
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Embark on a journey through space and time to discover the mysteries that lie beyond our world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#categories"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors group"
            >
              Start Exploring
              <ChevronDownIcon className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="#newsletter"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all"
            >
              Join Newsletter
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl bg-gray-800 p-6 transition-transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative z-10">
                  <RocketIcon className="w-8 h-8 mb-4 text-blue-500" />
                  <h3 className="text-xl font-semibold text-white mb-3">{category.title}</h3>
                  <p className="text-gray-400 mb-4">{category.description}</p>
                  <a
                    href={`#${category.title.toLowerCase()}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Learn More
                    <ChevronDownIcon className="ml-1 w-4 h-4 transform -rotate-90" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="relative py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Updated with Space News
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join our newsletter and receive the latest space discoveries, news, and fascinating facts directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Subscribe
                <SendIcon className="ml-2 w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <RocketIcon className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white">SpaceFacts</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2025 SpaceFacts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpaceFactsPage;