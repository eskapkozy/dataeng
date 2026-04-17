import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <Container>
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              DataEng
            </Link>
          </div>
          
          <div className="flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/community"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Community
            </Link>
            <Link
              to="/members"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Members
            </Link>
            <Link
              to="/write"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Write
            </Link>
            <Link
              to="/signin"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}
