'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="bg-white text-black p-4 shadow-md">
      {/* Wrapper */}
      <div className="flex justify-between items-center">
        {/* Left side - Title + Menu links (desktop only) */}
        <div className="flex items-center space-x-8">
          {/* Title */}
          <div className="text-xl font-semibold md:text-2xl md:font-bold md:text-black text-cyan-600">
            AEON
          </div>

          {/* Nav links - Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:underline">Showcase</Link>
            <Link href="/" className="hover:underline">Docs</Link>
            <Link href="/" className="hover:underline">Blog</Link>
            <Link href="/" className="hover:underline">Analytics</Link>
            <Link href="/" className="hover:underline">Templates</Link>
            <Link href="/" className="hover:underline">Enterprise</Link>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Search Icon or Search Input */}
          {showSearch ? (
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 rounded text-black w-40"
              autoFocus
            />
          ) : (
            <button onClick={() => setShowSearch(true)}>
              <FiSearch size={20} />
            </button>
          )}

          {/* Close menu */}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Right side - Desktop Search/Login */}
        <div className="hidden md:flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 rounded text-black"
          />
          <Link href="/challenge2">
            <button className="bg-cyan-600 text-white px-3 py-1 rounded">Login</button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="flex flex-col items-start space-y-4 mt-4 md:hidden">
          <Link href="/" className="hover:underline">Showcase</Link>
          <Link href="/" className="hover:underline">Docs</Link>
          <Link href="/" className="hover:underline">Blog</Link>
          <Link href="/" className="hover:underline">Analytics</Link>
          <Link href="/" className="hover:underline">Templates</Link>
          <Link href="/" className="hover:underline">Enterprise</Link>

          <Link href="/challenge2" className="w-full max-w-sm">
            <button className="bg-cyan-600 text-white px-3 py-2 w-full rounded">Login</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
