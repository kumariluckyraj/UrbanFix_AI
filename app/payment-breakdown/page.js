"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentBreakdown = () => {
  const data = {
    labels: [
      "👩‍🎨 Craftsperson / Artisan (50%)",
      "📦 Materials & Production (15%)",
      "🚚 Logistics & Shipping (10%)",
      "💻 Platform & Tech Costs (10%)",
      "📣 Marketing & Outreach (5%)",
      "🌱 Community or Growth Fund (10%)",
    ],
    datasets: [
      {
        label: "Payment Distribution",
        data: [50, 15, 10, 10, 5, 10],
        backgroundColor: [
          "#34D399", // Artisan - green
          "#FBBF24", // Materials - yellow
          "#60A5FA", // Logistics - blue
          "#A78BFA", // Platform - purple
          "#F472B6", // Marketing - pink
          "#4ADE80", // Community - light green
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Where Does Your Money Go?
      </h2>
      <Pie data={data} />
      <p className="mt-6 text-gray-700 leading-relaxed">
        Your contribution supports <strong>fair pay</strong> for artisans, covers
        <strong> eco-conscious materials and logistics</strong>, powers our platform
        sustainably, and helps us <strong>reach more supporters</strong> while
        reinvesting into community growth.
      </p>
    </div>
  );
};

export default PaymentBreakdown;
