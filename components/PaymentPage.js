"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";

const PaymentPage = ({ username, product }) => {
  const { data: session } = useSession();
  const [paymentform, setPaymentform] = useState({});
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    const u = await fetchuser(username);
    setcurrentUser(u);
    const dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    if (!razorpayReady) {
      alert("Razorpay script not loaded yet!");
      return;
    }

    const a = await initiate(amount, username, paymentform);
    const orderId = a.id;

    const options = {
      key: currentUser.razorpayid,
      amount,
      currency: "INR",
      name: product?.name || "Get Me A Chai",
      description: product?.description || "Support with a donation",
      image: product?.image || currentUser.profilepic,
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: session?.user?.name || "Guest",
        email: session?.user?.email || "",
        contact: "9000090000",
      },
      theme: {
        color: "#10b981",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayReady(true)}
      />

      

     

      
            
           

          
           
          

        
            
    </>
  );
};

export default PaymentPage;
