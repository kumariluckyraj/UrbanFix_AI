"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LearnerRegistration = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({});

  const getData = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const res = await fetch(`/api/learner?email=${session.user.email}`);
        const data = await res.json();
        setForm(data || {});
      } catch (err) {
        console.error(err);
      }
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") getData();
  }, [status, getData, router]);

  if (status === "loading") return <div className="text-center mt-10">Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const emptyField = Object.entries(data).find(([k, v]) => !v.trim());
    if (emptyField) {
      toast.error(`Please fill out the ${emptyField[0]} field.`);
      return;
    }

    try {
      const res = await fetch("/api/learner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("You have registered successfully! 🎉");
        setTimeout(() => router.push("/learn"), 2000);
      } else {
        const errData = await res.json();
        toast.error(errData.error || "Failed to register learner");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto py-5 px-6 pt-20">
      <h1 className="text-center rounded-2xl text-white px-2 text-3xl bg-green-600 font-bold">
        Learner Registration - EquiCraft
      </h1>

      <form className="max-w-2xl mx-auto mt-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="my-2">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">Full Name</label>
          <input type="text" name="name" id="name" defaultValue={form.name || ""} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
        </div>

        {/* Email */}
        <div className="my-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
          <input type="email" name="email" id="email" defaultValue={form.email || ""} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
        </div>

        {/* Username */}
        <div className="my-2">
          <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
          <input type="text" name="username" id="username" defaultValue={form.username || ""} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
        </div>

        {/* Region */}
        <div className="my-2">
          <label htmlFor="region" className="block mb-2 text-sm font-medium">Region / Community</label>
          <input type="text" name="region" id="region" defaultValue={form.region || ""} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
        </div>

        {/* Course Interest */}
        <div className="my-2">
          <label htmlFor="course_interest" className="block mb-2 text-sm font-medium">Course Interests</label>
          <select name="course_interest" id="course_interest" defaultValue={form.course_interest || ""} className="block w-full p-2 rounded-lg text-xs bg-green-300" required>
            <option value="">Select Your Course Interest</option>
            <option value="weaving">Weaving</option>
            <option value="pottery">Pottery</option>
            <option value="music">Music / Performance</option>
            <option value="storytelling">Oral Storytelling</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Learning Goals */}
        <div className="my-2">
          <label htmlFor="learning_goals" className="block mb-2 text-sm font-medium">Learning Goals</label>
          <textarea name="learning_goals" id="learning_goals" rows={4} defaultValue={form.learning_goals || ""} className="block w-full p-2 rounded-lg text-xs bg-green-300" placeholder="Tell us about what you hope to learn..."></textarea>
        </div>

        {/* Previous Experience */}
        <div className="my-2">
          <label htmlFor="previous_experience" className="block mb-2 text-sm font-medium">Previous Experience (Optional)</label>
          <input type="text" name="previous_experience" id="previous_experience" defaultValue={form.previous_experience || ""} className="block w-full p-2 rounded-lg text-xs bg-green-300" />
        </div>

        {/* Submit */}
        <div className="my-6">
          <button type="submit" className="block w-full p-2 bg-green-500 rounded-lg hover:bg-green-600 font-medium text-sm">Register</button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default LearnerRegistration;