"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Menu,
  X,
  ChevronDown,
  Rocket,
  ShieldCheck,
  Zap,
  UserCircle,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [token, setToken] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    setHydrated(true); // Prevent mismatch during SSR

    // Check token after hydration
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Contact", href: "/contact" },
  ];

  const featureLinks = [
    {
      label: "Fast Performance",
      description: "Blazing fast load times.",
      icon: Zap,
      href: "/features/performance",
    },
    {
      label: "Top-tier Security",
      description: "Your data is always safe.",
      icon: ShieldCheck,
      href: "/features/security",
    },
    {
      label: "Easy Scalability",
      description: "Grow without limits.",
      icon: Rocket,
      href: "/features/scalability",
    },
  ];

  // Avoid SSR mismatch
  if (!hydrated) {
    return null;
  }

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 transition-shadow duration-300 bg-white ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <span className="font-bold text-2xl text-gray-900">E-learning</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Features Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-green-500 transition-colors">
                Features{" "}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute hidden group-hover:block top-full mt-0 w-72 bg-white rounded-lg shadow-xl p-4 origin-top-right"
              >
                <div className="space-y-2">
                  {featureLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <link.icon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {link.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {link.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Regular Nav Links */}
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-medium text-gray-700 hover:text-green-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth/Profile */}
          <div className="hidden lg:flex items-center gap-4">
            {token ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <UserCircle className="h-8 w-8 text-gray-700 hover:text-green-500" />
                  <span className="font-medium text-gray-700">John Doe</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-700 transition-transform ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 origin-top-right"
                    >
                      <a
                        href="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserCircle className="h-3 w-3" /> Profile
                      </a>
                      <a
                        href="/dashboard"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <TrendingUp className="h-5 w-5" /> Dashboard
                      </a>
                      <div className="border-t my-1 border-gray-200"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <a
                  href="/auth/login"
                  className="font-medium text-gray-700 hover:text-green-500 transition-colors"
                >
                  Log In
                </a>
                <a
                  href="/auth/signup"
                  className="bg-green-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-green-700 transition-colors shadow-sm"
                >
                  Sign Up Free
                </a>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-7 w-7 text-gray-800" />
              ) : (
                <Menu className="h-7 w-7 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg pb-4"
          >
            <div className="px-5 py-6 space-y-4">
              <a
                href="/features"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-800 font-medium py-2 hover:text-green-500"
              >
                Features
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-800 font-medium py-2 hover:text-green-500"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                {token ? (
                  <>
                    <a
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-800 font-medium py-2 hover:text-green-500"
                    >
                      My Profile
                    </a>
                    <a
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-800 font-medium py-2 hover:text-green-500"
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block text-center w-full py-2.5 rounded-md text-red-600 font-semibold border border-red-300 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/auth/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center w-full py-2.5 rounded-md text-gray-800 font-semibold border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      Log In
                    </a>
                    <a
                      href="/auth/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center w-full py-2.5 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                    >
                      Sign Up Free
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
