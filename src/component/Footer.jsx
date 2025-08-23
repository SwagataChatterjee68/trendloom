import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 md:flex md:items-center md:justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 flex-col">
          <span className="text-2xl font-bold">TrendLoom</span>
          <p className='text-sm text-gray-500'>
            Empowering Your Digital Presence with TrendLoom
        </p>
        </div>
        

        {/* Navigation */}
        <nav className="mt-6 flex flex-wrap justify-center space-x-6 text-sm text-gray-600 md:mt-0">
          <Link href="#" className="hover:text-black transition">
            Home
          </Link>
          <Link href="#" className="hover:text-black transition">
            Blog
          </Link>
          <Link href="#" className="hover:text-black transition">
            About
          </Link>
          <Link href="#" className="hover:text-black transition">
            Contact
          </Link>
        </nav>

        {/* Socials */}
        <div className="mt-6 flex justify-center space-x-5 md:mt-0">
          <a href="#" className="text-gray-500 hover:text-black transition">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.2 4.2 0 001.85-2.32 8.27 8.27 0 01-2.64 1.01 4.14 4.14 0 00-7.07 3.77A11.76 11.76 0 013 4.8a4.13 4.13 0 001.28 5.52 4.1 4.1 0 01-1.87-.52v.05a4.14 4.14 0 003.32 4.05 4.17 4.17 0 01-1.86.07 4.14 4.14 0 003.87 2.88A8.32 8.32 0 012 19.54a11.74 11.74 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.18 8.18 0 0022.46 6z" />
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-black transition">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 3.59 8.06 8.24 8.88v-6.28H8.07v-2.6h2.17v-1.98c0-2.15 1.3-3.34 3.23-3.34.92 0 1.71.07 1.94.1v2.25h-1.33c-1.05 0-1.26.5-1.26 1.23v1.74h2.52l-.33 2.6h-2.19v6.28C18.41 20.1 22 16.46 22 12.04c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom note */}
      <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TrendLoom. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default Footer