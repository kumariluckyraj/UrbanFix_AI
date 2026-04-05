"use client";

import { useState } from "react";

export default function Home() {
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  // 🔥 Handle image upload (temporary URL)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // preview + send URL
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setConfirmed(false);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issue,
          location,
          imageUrl: image, // 🔥 send image (optional)
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🚧 UrbanFix AI</h1>

      {/* FORM */}
      <form
        onSubmit={handleAnalyze}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        {/* ISSUE */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Issue</label>
          <input
            type="text"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* LOCATION */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* 📸 IMAGE UPLOAD */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {/* 🖼️ PREVIEW */}
        {image && (
          <img
            src={image}
            alt="preview"
            className="mb-4 rounded-lg max-h-40 object-cover"
          />
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze Issue"}
        </button>
      </form>

      {/* RESULT */}
      {result && result.success && (
        <div className="mt-6 w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">📊 Analysis Result</h2>

          {/* Duplicate */}
          {result.data.duplicate ? (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              ⚠️ This issue has already been registered <br />
              Similarity: {result.data.similarTo?.score?.toFixed(2)}
            </div>
          ) : (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              ✅ No duplicate found — you can submit this issue
            </div>
          )}

          {/* Category */}
          <p>
            <strong>Category:</strong> {result.data.decision.category}
          </p>

          {/* Urgency */}
          <p>
            <strong>Urgency:</strong> {result.data.decision.urgency}
          </p>

          {/* 🔥 Priority */}
          <div className="mt-3">
            <strong>Priority:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-white text-sm ${
                result.data.priority.level === "CRITICAL"
                  ? "bg-red-500"
                  : result.data.priority.level === "MEDIUM"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {result.data.priority.level}
            </span>{" "}
            ({result.data.priority.score.toFixed(2)})
          </div>

          {/* Department */}
          <p className="mt-2">
            <strong>Department:</strong>{" "}
            {result.data.action.assignedDepartment}
          </p>

          {/* Status */}
          <p>
            <strong>Status:</strong> {result.data.action.status}
          </p>

          {/* 🎯 Confirm Button */}
          {!result.data.duplicate && !confirmed && (
            <button
              onClick={() => setConfirmed(true)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Confirm & Submit Ticket
            </button>
          )}

          {/* ✅ Confirmation */}
          {confirmed && (
            <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-lg">
              🎉 Ticket successfully submitted! <br />
              ID: {result.data.action.ticketId}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

