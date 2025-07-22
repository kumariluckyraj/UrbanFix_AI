"use client"
import React from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router
import './RegisterChoice.css'; // optional for styling

const RegisterChoice = () => {
  const router = useRouter(); // Initialize Next.js router

  const navigateTo = (selection) => {
    if (selection === 'artist') {
      router.push('/dashboard'); // Navigate to artist registration page
    } else if (selection === 'learner') {
      router.push('/dashboardl'); // Navigate to learner registration page
    } else if (selection === 'buyer') {
      router.push('/shoping'); // Navigate to buyer dashboard or registration page
    }
  };
  

  return (
    <section className="py-20 bg-gradient-to-r from-green-100 to-green-200">
    <div className="max-w-2xl mx-auto text-center px-6">
      <h1 className="text-4xl font-extrabold text-green-800 mb-4">Join Us</h1>
      <p className="text-lg text-gray-700 mb-10">How would you like to register?</p>
  
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
        {/* Artist Button */}
        <button
          onClick={() => navigateTo('artist')}
          className="bg-green-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-green-700 hover:scale-105 transition transform duration-200 font-semibold text-lg"
        >
          🎨 I am an Artist
        </button>
  
        {/* Learner Button */}
        <button
          onClick={() => navigateTo('learner')}
          className="bg-white text-green-700 border-2 border-green-600 px-8 py-4 rounded-2xl shadow-lg hover:bg-green-100 hover:scale-105 transition transform duration-200 font-semibold text-lg"
        >
          📚 I am a Learner
        </button>
  
        {/* Buyer Button */}
        <button
          onClick={() => navigateTo('buyer')}
          className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-green-600 hover:scale-105 transition transform duration-200 font-semibold text-lg"
        >
          🛒 I am a Buyer
        </button>
      </div>
    </div>
  </section>
  
  
  );
};

export default RegisterChoice;
