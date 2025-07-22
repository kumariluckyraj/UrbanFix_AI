"use client";
import React from "react";
import Link from "next/link";

const How = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-green-600 text-center mb-10">
        How SustainaLink Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h5 className="text-xl font-semibold mb-2">🌱 For Shoppers</h5>
          <p className="text-gray-600">
            Discover handcrafted, eco-friendly products made by local artisans. 
            Each purchase supports sustainable livelihoods and reduces environmental impact.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h5 className="text-xl font-semibold mb-2">🛠️ For Artisans</h5>
          <p className="text-gray-600">
            List your products easily. We showcase your story, highlight your craft, 
            and provide a platform to reach conscious customers worldwide.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h5 className="text-xl font-semibold mb-2">♻️ Impact Fund</h5>
          <p className="text-gray-600">
            A portion of every sale goes to our green economy impact fund — supporting 
            training, sustainable materials, and zero-waste packaging innovations.
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <h4 className="text-2xl font-bold text-green-700">Join the Movement</h4>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">
          Whether you&aposre buying, selling, or supporting — every action on SustainaLink contributes 
          to a greener, fairer, and more inclusive global economy.
        </p>
        <Link href="/login">
          <button className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default How;
