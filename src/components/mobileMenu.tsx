'use client'
    
import Link from 'next/link';
import { clsx } from 'clsx';
import { useState } from 'react';
import { navlinks } from '../config/navLinks'

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <>
      {/* Hamburger button */}
      <button 
        onClick={toggleMenu}
        className="md:hidden flex flex-col gap-1 btn-icon"
        aria-label="Toggle menu"
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>

      {/* Menu overlay */}
      <div 
        className={clsx(
          "fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-center z-50 transition-opacity duration-300",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button 
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-3xl link-text"
          aria-label="Close menu"
        >
          ✕
        </button>

        <nav className="flex flex-col gap-6">
          {navlinks.map((link) => (
            <Link 
              key={link.id} 
              href={link.path}
              onClick={closeMenu}
              className="text-2xl link-text"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default MobileMenu