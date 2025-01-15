import React from 'react';
import { Link } from '@tanstack/react-router';
import { BookOpen, PlusCircle } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              activeProps={{ className: 'border-b-2 border-blue-500' }}
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Entry
            </Link>
            <Link
              to="/logs"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              activeProps={{ className: 'border-b-2 border-blue-500' }}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View Logs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}