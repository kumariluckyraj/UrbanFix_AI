"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb()
  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
    key_secret: process.env.KEY_SECRET
  })

  const options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  }

  const x = await instance.orders.create(options)

  // Create a payment object showing a pending payment in the database
  await Payment.create({
    oid: x.id,
    amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message
  })

  return x
}

export const fetchuser = async (username) => {
  await connectDb()
  const u = await User.findOne({ username })

  if (!u) {
    return null
  }

  const user = u.toObject({ flattenObjectIds: true })
  return user
}

export const fetchpayments = async (username) => {
  await connectDb()
  const p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean()
  return p
}

export const updateProfile = async (data, oldusername) => {
  await connectDb()
  const ndata = data // ✅ fixed the bug here

  if (oldusername !== ndata.username) {
    const u = await User.findOne({ username: ndata.username })
    if (u) {
      return { error: "Username already exists" }
    }
  }

  await User.updateOne({ email: ndata.email }, ndata)
}
