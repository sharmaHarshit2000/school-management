'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { 
  Home, 
  Plus, 
  School, 
  Menu, 
  X 
} from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-header text-header shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold hover-effect"
          >
            <School className="h-6 w-6" />
            <span className="hidden sm:block">AcademiaHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/addSchool" 
              className="flex items-center space-x-2 hover-effect"
            >
              <Plus className="h-4 w-4" />
              <span>Add School</span>
            </Link>
            <Link 
              href="/showSchools" 
              className="flex items-center space-x-2 hover-effect-green"
            >
              <School className="h-4 w-4" />
              <span>Show Schools</span>
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover-effect"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 hover-effect py-2 px-3"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link 
                href="/addSchool"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 hover-effect py-2 px-3"
              >
                <Plus className="h-5 w-5" />
                <span>Add School</span>
              </Link>
              <Link 
                href="/showSchools"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 hover-effect-green py-2 px-3"
              >
                <School className="h-5 w-5" />
                <span>Show Schools</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}