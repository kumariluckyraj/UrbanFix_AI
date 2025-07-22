'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function FeedbackPage() {
  const { data: session } = useSession();
  const [productId, setProductId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!productId || !feedback) return;

    try {
      await axios.post('/api/feedback', {
        email: session?.user?.email,
        productId,
        feedback,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Feedback submission failed:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
         <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
    
      <div
        
        className="bg-white shadow-xl rounded-lg overflow-hidden h-[300px] flex flex-col w-[300px]"
      >
        <div className="w-full aspect-square overflow-hidden">
          <img
            src="/pot.jpeg"
            alt="pot"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-2 flex-1 flex flex-col justify-between">
          <div >
            <h2 className="text-lg font-bold text-green-700 line-clamp-1 ">
              pot
            </h2>
            <p className="text-gray-700 text-sm line-clamp-2">
              old model
            </p>
            <p className="text-gray-700 text-sm line-clamp-2">
              <strong>Product Id:</strong> 86724
            </p>
            <p className="text-sm font-semibold">₹200</p>
          </div>
          <div className="text-sm text-gray-600">
            <p><strong>Eco Impact:</strong> abc</p>
            <p><strong>Artist&aposs Story:</strong> def</p>
            <p><strong>Cultural Meaning:</strong> ijk</p>
          </div>
         
        </div>
      </div>
    
    
  </div>

      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>

      {!submitted ? (
        <>
          <input
            type="text"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <textarea
            placeholder="Your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </>
      ) : (
        <p className="text-green-700 mt-4">Thanks for your feedback!</p>
      )}
    </div>
  );
}
