import React from "react";
import { GraduationCap } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = "Reward Attendance App" }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Reward Attendance
                </h1>
                <p className="text-sm text-gray-500">
                  Student Recognition Program
                </p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {title && (
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
        )}

        {children}

      </main>

    </div>
  );
}