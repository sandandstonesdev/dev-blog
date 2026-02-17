import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="border-t border-blue-500 p-4 text-center text-sm bg-gray-800 text-white">
      <footer>
        <p>@2026 Your Company</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/privacy" className="link-underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Footer
