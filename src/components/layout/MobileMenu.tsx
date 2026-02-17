'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import { useState } from 'react';
import { navlinks } from '@/config/navLinks';

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col gap-1 btn-icon focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-controls="mobile-menu"
        aria-expanded={menuOpen}
        type="button"
      >
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={clsx(
          'fixed inset-0 bg-gray-900/95 text-white flex flex-col items-center justify-center z-50 transition-opacity duration-300 md:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-3xl link-text focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Close menu"
          type="button"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <nav className="flex flex-col gap-6 w-full max-w-xs" aria-label="Mobile navigation">
          {navlinks.map((link) => (
            <Link
              key={link.id}
              href={link.path}
              onClick={closeMenu}
              className="text-2xl link-text py-3 px-6 rounded w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              tabIndex={menuOpen ? 0 : -1}
              aria-current={menuOpen && typeof window !== 'undefined' && window.location.pathname === link.path ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;