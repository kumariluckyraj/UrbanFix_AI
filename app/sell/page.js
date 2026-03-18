"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Sell = () => {
  const { data: session, status } = useSession(); // Get session & status
  const router = useRouter();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    ecoImpact: "",
    artistStory: "",
    culturalMeaning: "",
    materials: "",
    imageFile: null,
  });

  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ecoAnalysis, setEcoAnalysis] = useState("");
  const [relatedKnowledge, setRelatedKnowledge] = useState([]);
  const [allowSubmit, setAllowSubmit] = useState(false);

  // -------------------- Authentication --------------------
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="text-center mt-10 text-gray-700">
        Loading authentication...
      </div>
    );
  }

  // -------------------- Handle Input --------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setProduct((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getImageBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  // -------------------- Analyze Product --------------------
  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setEcoAnalysis("");
    setAllowSubmit(false);

    if (!product.imageFile) {
      setError("Please upload an image");
      setLoading(false);
      return;
    }

    try {
      const base64 = await getImageBase64(product.imageFile);
      setImageBase64(base64);

      const payload = {
        ...product,
        price: Number(product.price),
        imageBase64: base64,
        submittedBy: session?.user?.email || "anonymous", // Optional: tie submission to user
      };

      const res = await fetch("/api/upload-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to analyze product");

      setEcoAnalysis(data.ecoAnalysis || "");
      setRelatedKnowledge(data.relatedKnowledge || []);
      setAllowSubmit(data.allowSubmit || false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Submit Product --------------------
  const handleSubmit = async () => {
    if (!allowSubmit || !imageBase64) return;
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...product,
        price: Number(product.price),
        imageBase64,
        submittedBy: session?.user?.email || "anonymous",
      };

      const res = await fetch("/api/upload-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit product");

      alert("✅ Product submitted successfully!");

      // Reset form
      setProduct({
        name: "",
        description: "",
        price: "",
        ecoImpact: "",
        artistStory: "",
        culturalMeaning: "",
        materials: "",
        imageFile: null,
      });
      setImageBase64(null);
      setEcoAnalysis("");
      setRelatedKnowledge([]);
      setAllowSubmit(false);

      document.getElementById("imageFile").value = "";
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-green-200">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
          ✨ Share Your Creation
        </h2>

        <p className="text-center text-gray-600 mb-8 text-lg">
          Tell the story behind your eco-friendly product.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="space-y-6">
          {[
            "name",
            "description",
            "materials",
            "price",
            "ecoImpact",
            "artistStory",
            "culturalMeaning",
          ].map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")}
              </label>

              {["description", "ecoImpact", "artistStory", "culturalMeaning"].includes(
                field
              ) ? (
                <textarea
                  name={field}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                  value={product[field]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type={field === "price" ? "number" : "text"}
                  name={field}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                  value={product[field]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image
            </label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-green-600 text-white font-semibold ${
              loading ? "opacity-70" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Analyzing..." : "🔍 Analyze Product"}
          </button>

          {allowSubmit && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {loading ? "Submitting..." : "🚀 Submit Product"}
            </button>
          )}
        </form>

        {ecoAnalysis && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
            <h3 className="text-xl font-bold text-green-700 mb-4">🌱 Eco Analysis</h3>
            <p className="text-gray-700 whitespace-pre-line">{ecoAnalysis}</p>

            {relatedKnowledge.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-green-600 mb-2">Related Knowledge:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {relatedKnowledge.map((k, idx) => (
                    <li key={idx}>{k.text}</li>
                  ))}
                </ul>
              </div>
            )}

            {!allowSubmit && (
              <p className="mt-4 text-red-600 font-semibold">
                ❌ Not eco-friendly. Cannot submit.
              </p>
            )}

            {allowSubmit && (
              <p className="mt-4 text-green-700 font-semibold">
                ✅ Eco-friendly! You can submit.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sell;