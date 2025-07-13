import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, Award, Users, Calendar } from 'lucide-react';
import Layout from './Layout';

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="bg-indigo-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-indigo-600">Reward Attendance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Track your attendance, earn recognition, and be part of our student achievement program. 
              Join thousands of students already benefiting from our rewards system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link
              to="/register"
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-300"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <UserPlus className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">New Student?</h3>
              <p className="text-gray-600 mb-4">
                Create your account to start tracking attendance and earning rewards
              </p>
              <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:bg-green-700 transition-colors">
                Register Now
              </div>
            </Link>

            <Link
              to="/login"
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-300"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                <LogIn className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Returning Student?</h3>
              <p className="text-gray-600 mb-4">
                Sign in to access your dashboard and view your attendance record
              </p>
              <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:bg-indigo-700 transition-colors">
                Sign In
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Join Our Program?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Track Attendance</h4>
                <p className="text-gray-600 text-sm">Monitor your attendance record and stay on top of your academic goals</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Earn Rewards</h4>
                <p className="text-gray-600 text-sm">Get recognized for consistent attendance with certificates and prizes</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Join Community</h4>
                <p className="text-gray-600 text-sm">Be part of a community that values education and achievement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}