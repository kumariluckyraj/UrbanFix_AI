"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { fetchuser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './dashboard.css';

const Dashboard = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});

  const getData = useCallback(async () => {
    if (session?.user?.name) {
      const u = await fetchuser(session.user.name);
      setform(u);
    }
  }, [session?.user?.name]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }

    if (status === "authenticated" && session) {
      getData();
    }
  }, [status, session, getData, router]);

  if (status === "loading") {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    const emptyField = Object.entries(data).find(([key, value]) => value.trim() === "");
    if (emptyField) {
      toast.error(`Please fill out the ${emptyField[0]} field.`);
      return;
    }
  
    await update();
    await updateProfile(data, session.user.name);
  
    toast.success("You have registered successfully! 🎉");
  
    setTimeout(() => {
      router.push('/sell');
    }, 2000); // Delay navigation to let user see the toast
  };
  
  

  return (
    <div>
      <div className='container mx-auto py-5 px-6 pt-20'>
        <h1 className='text-center py-2 text-white
   text-3xl font-bold rounded-2xl bg-green-600'>Artist Registration - EquiCraft</h1>

        <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
          <div className='my-2'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Full Name</label>
            <input type="text" name="name" id="name" defaultValue={form.name || ''} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
          </div>

          <div className="my-2">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input type="email" name="email" id="email" defaultValue={form.email || ''} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
          </div>

          <div className='my-2'>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
            <input type="text" name="username" id="username" defaultValue={form.username || ''} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
          </div>

          <div className='my-2'>
            <label htmlFor="region" className="block mb-2 text-sm font-medium">Region / Community</label>
            <input type="text" name="region" id="region" defaultValue={form.region || ''} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
          </div>

          <div className="my-2">
            <label htmlFor="craft" className="block mb-2 text-sm font-medium">Art Form / Craft</label>
            <select name="craft" id="craft" defaultValue={form.craft || ''} required className="block w-full p-2 rounded-lg text-xs bg-green-300">
              <option value="">Select Your Art Form</option>
              <option value="weaving">Weaving</option>
              <option value="pottery">Pottery</option>
              <option value="woodwork">Woodwork</option>
              <option value="folk_painting">Folk Painting</option>
              <option value="music">Music / Performance</option>
              <option value="storytelling">Oral Storytelling</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="my-2">
            <label htmlFor="experience" className="block mb-2 text-sm font-medium">Years of Experience</label>
            <input type="text" name="experience" id="experience" defaultValue={form.experience || ''} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
          </div>

          <div className="my-2">
            <label htmlFor="bio" className="block mb-2 text-sm font-medium">About Your Work</label>
            <textarea name="bio" id="bio" rows={4} defaultValue={form.bio || ''} className="block w-full p-2 rounded-lg text-xs bg-green-300" placeholder="Tell us about your journey and practice..."></textarea>
          </div>

          <div className="my-2">
            <label htmlFor="portfolio" className="block mb-2 text-sm font-medium">Portfolio / Instagram / Gallery Link</label>
            <input type="url" name="portfolio" id="portfolio" defaultValue={form.portfolio || ''} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
          </div>

          <div className="my-6">
            <button type="submit" className="text-white
 block w-full p-2 bg-green-500 rounded-lg hover:bg-green-600 font-medium text-sm">Register</button>
          </div>
        </form>
      </div>
      <ToastContainer
  position="top-center" // this will be overridden by className anyway
  autoClose={2000}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover
  draggable
  className="custom-toast"
/>



    </div>
  );
};

export default Dashboard;
