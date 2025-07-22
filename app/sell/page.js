"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Sell = () => {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    ecoImpact: "",
    artistStory: "",
    culturalMeaning: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const existingProducts = JSON.parse(sessionStorage.getItem("allProducts")) || [];
      existingProducts.push(product);
      sessionStorage.setItem("allProducts", JSON.stringify(existingProducts));
    }
    router.push("/shop");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-green-200 transition hover:shadow-green-200">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-8">✨ Share Your Creation</h2>
        <p className="text-center text-gray-600 mb-8 text-lg">Tell the story behind your art and sell it with purpose.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "description", "price", "image", "ecoImpact"].map((field, i) => (
            <div key={i}>
              <label htmlFor={field} className="block text-sm font-semibold text-gray-700 mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
              {field === "description" || field === "ecoImpact" ? (
                <textarea
                  id={field}
                  name={field}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                  placeholder={`Enter ${field}`}
                  value={product[field]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type={field === "price" ? "number" : "text"}
                  id={field}
                  name={field}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                  placeholder={`Enter ${field}`}
                  value={product[field]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}

          <div>
            <label htmlFor="artistStory" className="block text-sm font-semibold text-gray-700 mb-2">
              Your Story as an Artist
            </label>
            <textarea
              id="artistStory"
              name="artistStory"
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="What inspires your work?"
              value={product.artistStory}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="culturalMeaning" className="block text-sm font-semibold text-gray-700 mb-2">
              Cultural Meaning Behind Your Work
            </label>
            <textarea
              id="culturalMeaning"
              name="culturalMeaning"
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Describe the cultural or traditional significance"
              value={product.culturalMeaning}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-transform transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            🚀 Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
