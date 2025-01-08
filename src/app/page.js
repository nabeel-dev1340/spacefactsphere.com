"use client";
import React, { useState, useEffect } from "react";
import {
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  SendIcon,
  RocketIcon,
} from "lucide-react";

// First, add custom animation keyframes via a style tag
const CustomAnimations = () => (
  <style jsx global>{`
    @keyframes float {
      0%,
      100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @keyframes twinkle {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
    }

    @keyframes shooting-star {
      0% {
        transform: translateX(0) translateY(0) rotate(45deg);
        opacity: 1;
      }
      100% {
        transform: translateX(-100vw) translateY(100vh) rotate(45deg);
        opacity: 0;
      }
    }

    @keyframes ripple {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-ripple {
      animation: ripple 1s ease-out infinite;
    }
  `}</style>
);

const SpaceFactsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Enhanced StarField with shooting stars
  const StarField = () => {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <div
            key={`shooting-star-${i}`}
            className="absolute w-2 h-2 bg-white"
            style={{
              top: `${Math.random() * 50}%`,
              left: "100%",
              animation: `shooting-star 3s linear infinite`,
              animationDelay: `${i * 4}s`,
            }}
          />
        ))}
      </div>
    );
  };

  // Interactive ripple effect component
  const RippleEffect = ({ x, y }) => (
    <div
      className="absolute w-12 h-12 border-2 border-blue-500 rounded-full animate-ripple"
      style={{ left: x - 24, top: y - 24 }}
    />
  );

  const categories = [
    {
      title: "Solar System",
      description:
        "Explore our cosmic neighborhood - from the Sun to the mysterious Kuiper Belt objects.",
      gradient: "from-yellow-600 to-orange-600",
    },
    {
      title: "Deep Space",
      description:
        "Journey beyond our solar system to discover nebulae, black holes, and distant galaxies.",
      gradient: "from-purple-600 to-blue-600",
    },
    {
      title: "Space Exploration",
      description:
        "Follow humanity's journey to the stars through missions, discoveries, and future plans.",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      title: "Astronauts",
      description:
        "Meet the brave pioneers who venture into space and learn about life in zero gravity.",
      gradient: "from-green-600 to-teal-600",
    },
    {
      title: "Telescopes",
      description:
        "Discover the incredible instruments that let us peek into the cosmos.",
      gradient: "from-red-600 to-pink-600",
    },
    {
      title: "Cosmic Events",
      description:
        "Experience meteor showers, eclipses, and other spectacular celestial phenomena.",
      gradient: "from-amber-600 to-yellow-600",
    },
    {
      title: "Space Weather",
      description:
        "Understand solar flares, cosmic radiation, and their effects on Earth.",
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      title: "Exoplanets",
      description:
        "Explore worlds beyond our solar system and the search for habitable planets.",
      gradient: "from-emerald-600 to-green-600",
    },
    {
      title: "Space Technology",
      description:
        "Learn about rockets, satellites, and cutting-edge space innovations.",
      gradient: "from-gray-600 to-slate-600",
    },
    {
      title: "Astrobiology",
      description:
        "Investigate the possibility of life elsewhere in the universe.",
      gradient: "from-lime-600 to-green-600",
    },
    {
      title: "Space Stations",
      description:
        "Tour humanity's outposts in orbit and future space habitats.",
      gradient: "from-violet-600 to-purple-600",
    },
    {
      title: "Cosmic Origins",
      description:
        "Uncover the big bang, cosmic expansion, and the birth of our universe.",
      gradient: "from-fuchsia-600 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <CustomAnimations />
      <StarField />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black bg-opacity-90 backdrop-blur-lg translate-y-0"
            : "bg-transparent -translate-y-1"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <RocketIcon className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">SpaceFacts</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Categories", "Newsletter", "About"].map((item) => (
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
                {["Home", "Categories", "Newsletter", "About"].map((item) => (
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

      {/* Hero Section with parallax effect */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover transform scale-105 transition-transform duration-1000"
          >
            <source src="/background/astronaut_waving.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-gray-900" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-float">
            Explore the Wonders of the
            <span className="block bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
              Universe
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 translate-y-10 animate-on-scroll transition-all duration-1000 delay-300">
            Embark on a journey through space and time to discover the mysteries
            that lie beyond our world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 translate-y-10 animate-on-scroll transition-all duration-1000 delay-500">
            <a
              href="#categories"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
            >
              Start Exploring
              <ChevronDownIcon className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="#newsletter"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/50"
            >
              Join Newsletter
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section with hover effects */}
      <section id="categories" className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 opacity-0 translate-y-10 animate-on-scroll transition-all duration-1000">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl bg-gray-800 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 opacity-0 translate-y-10 animate-on-scroll"
                style={{ transitionDelay: `${150 * (index % 4)}ms` }}
                onMouseEnter={() => setActiveCategory(index)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]" />
                <div className="relative z-10">
                  <RocketIcon
                    className={`w-8 h-8 mb-4 text-blue-500 transition-transform duration-500 ${
                      activeCategory === index ? "rotate-12 scale-110" : ""
                    }`}
                  />
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{category.description}</p>
                  <a
                    href={`#${category.title.toLowerCase().replace(" ", "-")}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                  >
                    Learn More
                    <ChevronDownIcon className="ml-1 w-4 h-4 transform -rotate-90 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section with interactive elements */}
      <section id="newsletter" className="relative py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 opacity-0 translate-y-10 animate-on-scroll transition-all duration-1000">
              Stay Updated with Space News
            </h2>
            <p className="text-xl text-gray-400 mb-8 opacity-0 translate-y-10 animate-on-scroll transition-all duration-1000 delay-200">
              Join our newsletter and receive the latest space discoveries,
              news, and fascinating facts directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto opacity-0 translate-y-10 animate-on-scroll transition-all duration-1000 delay-400">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors focus:shadow-lg focus:shadow-blue-500/20"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
              >
                Subscribe
                <SendIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer with subtle animations */}
      <footer className="bg-black text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0 hover:scale-105 transition-transform">
              <RocketIcon className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white">SpaceFacts</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-white transition-all duration-300 hover:scale-105"
                >
                  {item}
                </a>
              ))}
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
