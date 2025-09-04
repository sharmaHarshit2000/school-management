'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom text-custom px-4">
      <AlertCircle className="w-20 h-20 text-red-500 dark:text-red-400 mb-6" />
      <h1 className="text-4xl font-bold mb-2 text-header">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );
}
