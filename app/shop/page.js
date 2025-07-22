"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
const Shop = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [razorpayReady, setRazorpayReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("allProducts");
      if (saved) {
        setProducts(JSON.parse(saved));
      }
    }
  }, []);

  const updateSessionStorage = (newProducts) => {
    sessionStorage.setItem("allProducts", JSON.stringify(newProducts));
  };

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    localStorage.setItem("cartItems", JSON.stringify([...existingCart, product]));
    alert("Product added to cart!");
  };

  const handleEdit = () => {
    router.push("/sell"); // You could enhance this to support editing specific product data
  };

  const handleDelete = (indexToRemove) => {
    const updatedProducts = products.filter((_, index) => index !== indexToRemove);
    setProducts(updatedProducts);
    updateSessionStorage(updatedProducts);
    alert("Product deleted!");
  };

  const handleBuyNow = (product) => {
    if (!razorpayReady) {
      alert("Razorpay is not ready yet.");
      return;
    }

    const amountInPaise = parseInt(product.price) * 100;

    const options = {
      key: process.env.NEXT_PUBLIC_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      name: "Sustainable Marketplace",
      description: product.name,
      image: product.image,
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Buyer",
        email: "buyer@example.com",
        contact: "9000090000",
      },
      theme: {
        color: "#22c55e",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!products.length) {
    return (
      <div className="text-center text-gray-600 text-xl mt-10">
        No products available.
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-lg overflow-hidden h-[400px] flex flex-col"
          >
            <div className="w-full aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-2 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-green-700 line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-gray-700 text-sm line-clamp-2">
                  {product.description}
                </p>
                <p className="text-sm font-semibold">₹{product.price}</p>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Eco Impact:</strong> {product.ecoImpact}</p>
                <p><strong>Artist&aposs Story:</strong> {product.artistStory}</p>
                <p><strong>Cultural Meaning:</strong> {product.culturalMeaning}</p>
              </div>
              <div className="m-4 flex flex-wrap justify-between gap-1 text-xs">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {/* Creator Section BELOW product list */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-6">
          Creator Insights & Earnings Dashboard
          </h1>
          <div className="bg-green-100 p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Creator Data</h3>
            <p className="text-gray-700 mb-6">
              Your creator&aposs data provides a personalized dashboard displaying total sales, feedback from buyers, and detailed earning breakdowns. It empowers creators to track their impact, understand buyer sentiment, and manage their income effectively.
            </p>
            <Link href="/creator">
              <span className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
                Your Data
              </span>
            </Link>
          </div>
        </div>
      </section>
  
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayReady(true)}
      />
    </>
  );
  
 
}  

export default Shop;
