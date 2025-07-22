"use client";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(storedItems);
    }
  }, []);

  const handleRemoveItem = (indexToRemove) => {
    const newCart = cartItems.filter((_, index) => index !== indexToRemove);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    setCartItems(newCart);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <FaShoppingCart className="text-4xl text-green-700" />
        <h1 className="text-4xl font-bold text-green-800">My Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-20">
          Your cart is empty. Start exploring sustainable products!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex gap-5 items-start"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-xl border border-gray-200"
              />
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-semibold text-green-700">
                  {item.name}
                </h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-lg font-bold text-green-800">
                  ₹{item.price}
                </p>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg mt-2 transition-colors duration-200"
                >
                  <FaTrashAlt />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCart;
