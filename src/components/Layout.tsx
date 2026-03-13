import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'Reward Attendance App' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-white">
                  Reward Attendance
                </h1>
                <p className="text-sm text-white/80">
                  Student Recognition Program
                </p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">

        {title && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
        )}

        {children}

      </main>

    </div>
  );
}