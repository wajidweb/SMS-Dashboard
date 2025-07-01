'use client'
import React from 'react';
import { MessageSquare, Zap, Shield, BarChart3, ArrowRight, Star, Users, Send } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-blue-100/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                SMS Dashboard
              </span>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <Link href={'/login'} className="px-4 py-2 md:px-6 md:py-2.5 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:bg-blue-50 rounded-lg">
                Login
              </Link>
              <Link href={'/signup'} className="px-4 py-2 md:px-6 md:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200/50">
                <Star className="w-4 h-4" />
                <span>Trusted by 10,000+ businesses</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Powerful SMS
                <span className="block bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Marketing Platform
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Send personalized SMS campaigns, track engagement, and grow your business with our intuitive dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href={'/signup'} className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href={'/login'} className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200">
                  See It in Action
                  <Zap className="ml-2 w-5 h-5" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 lg:gap-8">
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">99.9%</div>
                  <div className="text-sm text-gray-600">Delivery Rate</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">50M+</div>
                  <div className="text-sm text-gray-600">Messages Sent</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-white text-sm font-medium">SMS Dashboard</div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200/50">
                      <div className="flex items-center justify-between mb-2">
                        <Send className="w-5 h-5 text-blue-600" />
                        <span className="text-xs text-blue-600 font-medium">+12%</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-700">1,245</div>
                      <div className="text-xs text-blue-600">Messages Sent</div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg border border-cyan-200/50">
                      <div className="flex items-center justify-between mb-2">
                        <Users className="w-5 h-5 text-cyan-600" />
                        <span className="text-xs text-cyan-600 font-medium">+8%</span>
                      </div>
                      <div className="text-2xl font-bold text-cyan-700">892</div>
                      <div className="text-xs text-cyan-600">Active Users</div>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="bg-gray-50 rounded-lg p-4 h-32 flex items-end space-x-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-blue-400 to-blue-500 rounded-t flex-1 transition-all duration-1000 hover:from-blue-500 hover:to-blue-600"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700">Recent Activity</div>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-700">Campaign sent successfully</div>
                          <div className="text-xs text-gray-500">{i} minutes ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  SMS Dashboard
                </span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                Empowering businesses to connect with their customers through powerful SMS marketing campaigns and real-time analytics.
              </p>
             
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'API', 'Documentation'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-3">
                {['Help Center', 'Contact Us', 'Status', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                © 2025 SMS Dashboard. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Terms</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;