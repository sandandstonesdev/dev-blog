'use client'

import Link from 'next/link'
import { navlinks } from '@/config/navLinks'
import MobileMenu from './MobileMenu'

const Navbar = () => {
  return (
    <div>
      <ul className="hidden md:flex flex-row gap-6">
        {navlinks.map((link) => (
          <li key={link.id}>
            <Link href={link.path} className="link-text">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <MobileMenu/>  
    </div>
  )
}

export default Navbar
