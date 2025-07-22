'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { FaMoneyBillWave, FaComments, FaHandHoldingUsd } from 'react-icons/fa';

export default function CreatorDashboard() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawMessage, setWithdrawMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.email) {
        try {
          const res = await axios.get(`/api/creator-data?email=${session.user.email}`);
          setDashboardData(res.data);
        } catch (err) {
          console.error("API Error:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session]);

  const handleWithdraw = () => {
    setWithdrawMessage("Your withdrawal request has been submitted. It will be processed shortly.");
  };

  if (loading || !dashboardData) {
    return <p className="text-center py-20 text-lg text-gray-600">Loading your dashboard...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-green-700 text-center mb-10">🎨 Creator Dashboard</h1>

      {/* Earnings Card */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
          <FaMoneyBillWave className="text-4xl text-green-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">₹{dashboardData.totalEarnings}</p>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 col-span-2">
          <FaComments className="text-3xl text-green-400 mb-2" />
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Customer Feedback</h2>
          {dashboardData.feedback.length === 0 ? (
            <p className="text-gray-500 italic">No feedback yet.</p>
          ) : (
            <ul className="list-disc pl-6 space-y-2 text-gray-700 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300">
              {dashboardData.feedback.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Withdraw Section */}
      <div className="bg-green-50 rounded-2xl border border-green-200 shadow-md p-8 text-center hover:shadow-lg transition duration-300">
        <FaHandHoldingUsd className="text-4xl text-green-600 mb-4 mx-auto" />
        <h2 className="text-2xl font-semibold text-green-700 mb-2">Withdraw Earnings</h2>
        <p className="text-gray-600 mb-6">Click below to request a withdrawal of your available earnings.</p>
        <button
          onClick={handleWithdraw}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-full transition"
        >
          Withdraw Now
        </button>
        {withdrawMessage && <p className="text-sm text-green-700 mt-4">{withdrawMessage}</p>}
      </div>
    </div>
  );
}
