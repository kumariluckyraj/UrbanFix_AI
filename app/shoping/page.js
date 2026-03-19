"use client";
import React, { useState, useEffect } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    location: "",
    email: "",
  });
  const [cart, setCart] = useState([]);

  // Load Razorpay
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayReady(true);
    document.body.appendChild(script);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("myCart") || "[]");
    setCart(existingCart);
  }, []);

  // Auto fetch location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            setUserDetails((prev) => ({ ...prev, location: data.display_name }));
          } catch (err) {
            console.error("Failed to fetch address:", err);
          }
        },
        (err) => console.error(err)
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuyNow = async (product) => {
    if (!razorpayReady) {
      alert("Razorpay is not ready yet.");
      return;
    }
    if (!userDetails.name || !userDetails.phone) {
      alert("Please enter your name and phone number");
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
      prefill: {
        name: userDetails.name,
        email: userDetails.email || "",
        contact: userDetails.phone,
      },
      theme: { color: "#22c55e" },
      handler: async function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

        // Save order to DB
        try {
          await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: product._id,
              productName: product.name,
              productPrice: product.price,
              buyerName: userDetails.name,
              buyerEmail: userDetails.email,
              buyerPhone: userDetails.phone,
              location: userDetails.location,
              paymentId: response.razorpay_payment_id,
            }),
          });
          alert("✅ Order saved successfully!");
        } catch (err) {
          console.error(err);
          alert("Failed to save order.");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("myCart") || "[]");
    // Prevent duplicates
    if (existingCart.find((p) => p._id === product._id)) {
      alert(`✅ "${product.name}" is already in cart!`);
      return;
    }
    existingCart.push(product);
    localStorage.setItem("myCart", JSON.stringify(existingCart));
    setCart(existingCart);
    alert(`✅ "${product.name}" added to cart!`);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((p) => p._id !== productId);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    alert("✅ Product removed from cart!");
  };

  const handleRemoveFromDB = async (productId) => {
  const confirmDelete = confirm("Are you sure you want to delete this product permanently?");
  if (!confirmDelete) return;

  try {
    const res = await fetch("/api/delete-product", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to delete product");

    // Remove from UI immediately
    setProducts(products.filter((p) => p._id !== productId));
    alert("✅ Product deleted from DB!");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to delete product: " + err.message);
  }
};

  if (!products.length) return <div className="text-center mt-10 text-gray-600">No products available.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* User Info */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <h2 className="font-bold text-green-700 mb-2">Enter Your Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userDetails.name}
          onChange={handleInputChange}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={userDetails.phone}
          onChange={handleInputChange}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          name="email"
          placeholder="Email (optional)"
          value={userDetails.email}
          onChange={handleInputChange}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={userDetails.location}
          onChange={handleInputChange}
          className="border p-2 rounded w-full mb-2"
        />
        <p className="text-gray-600 text-sm">Location can be auto-filled using your browser.</p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col h-[450px]">
            <div className="w-full aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="px-2 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-green-700">{product.name}</h2>
                <p className="text-gray-700 text-sm line-clamp-2">{product.description}</p>
                <p className="text-sm font-semibold">₹{product.price}</p>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Eco Impact:</strong> {product.ecoImpact}</p>
                <p><strong>Artist&apos;s Story:</strong> {product.artistStory}</p>
                <p><strong>Cultural Meaning:</strong> {product.culturalMeaning}</p>
              </div>
              <div className="flex justify-end gap-2 m-4 text-xs">
                <button
                  onClick={() => handleBuyNow(product)}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Add to Cart
                </button>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;