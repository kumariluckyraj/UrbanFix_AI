"use client";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on page load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("myCart") || "[]");
    setCartItems(savedCart);
  }, []);

  // Remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="border p-4 rounded flex flex-col">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-2 rounded" />
                <h2 className="font-bold text-green-700">{item.name}</h2>
                <p className="text-gray-700">₹{item.price}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                <button
                  onClick={() => removeFromCart(idx)}
                  className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center p-4 border-t">
            <p className="font-bold text-lg">Total: ₹{totalPrice}</p>
            {/* Here you could add a "Checkout All" button if you want */}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;