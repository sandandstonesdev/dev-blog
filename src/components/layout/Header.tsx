import Image from 'next/image'
import Navbar from './Navbar'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-blue-500 bg-gray-800 text-white" role="banner">
      <h1 className="font-bold text-xl">
        <Link href="/" aria-label="Home" className="transition-opacity duration-200 hover:opacity-100">
          <Image src="/favicon.ico" alt="Logo" width={40} height={40} className="opacity-65" />
        </Link>
      </h1>
      <nav role="navigation" aria-label="Main navigation">
        <Navbar />
      </nav>
    </header>
  )
}

export default Header
