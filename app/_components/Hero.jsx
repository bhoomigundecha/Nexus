"use client";

import React from "react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative z-10">
      <div className="mx-auto max-w-screen-xl lg:flex lg:flex-col lg:items-center relative z-10">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Badge */}
          <div className="-mt-8">
            <div className="-mt-64 inline-flex items-center bg-blue-100 px-4 py-2 rounded-full mb-8">
              <span className="text-blue-700 text-sm font-medium">
                ⚡ Take Full Control of Your Learning
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-extrabold sm:text-6xl text-gray-900 leading-tight mb-6">
            Empowering Learners <br /> One Course at a{" "}
            <span className="text-blue-700">Time</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-4 text-lg text-gray-600 sm:text-xl/relaxed max-w-2xl mx-auto mb-10">
            Nexus was created to meet the need for a fast, intuitive, and
            flexible AI course generator that helps you achieve maximum
            productivity.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button
              type="button"
              onClick={() => {
                window.location.href = '/dashboard';
              }}
              className="inline-block rounded-lg bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:scale-105 cursor-pointer relative z-10 border-0"
            >
              Start Learning
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = '/dashboard';
              }}
              className="inline-block rounded-lg bg-white border border-gray-200 px-8 py-4 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-all hover:scale-105 cursor-pointer relative z-10"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="mt-8 w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-100 p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">2025</h3>
            <p className="text-gray-500 text-sm">Product release</p>
          </div>
          <div className="md:border-l border-gray-100">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">15+</h3>
            <p className="text-gray-500 text-sm">Courses generated</p>
          </div>
          <div className="md:border-l border-gray-100">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">5+</h3>
            <p className="text-gray-500 text-sm">Active Learners</p>
          </div>
          <div className="md:border-l border-gray-100">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-500 text-sm">AI Powered</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
