"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SkillsPage() {
  const { data: session, status } = useSession(); // Authentication
  const router = useRouter();

  const [query, setQuery] = useState("");         // User input
  const [videoUrl, setVideoUrl] = useState("");   // YouTube embed URL
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");         // Error state

  // -------------------- Authentication --------------------
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect unauthenticated users
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="text-center mt-10 text-gray-700">
        Checking authentication...
      </div>
    );
  }

  // -------------------- YouTube Video Search --------------------
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError("");
    setVideoUrl("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
          query
        )}&key=${apiKey}`
      );
      const data = await res.json();

      const videoItem = data.items?.find(item => item.id.kind === "youtube#video");
      if (videoItem) {
        setVideoUrl(`https://www.youtube.com/embed/${videoItem.id.videoId}`);
      } else {
        setError("No video found for this query.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching video. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skills-page bg-light-green">
      {/* Intro Section */}
      <section className="intro py-8">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Upskilling & Reskilling for the Green Economy
          </h2>
          <p className="text-xl text-gray-700">
            Preparing for the future with the right tools and knowledge in eco-friendly industries.
          </p>

          {/* User input for YouTube video */}
          <form onSubmit={handleSearch} className="mt-6 flex justify-center gap-2">
            <input
              type="text"
              placeholder="Search a video..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-r-full bg-green-600 text-white hover:bg-green-700 transition"
            >
              Search
            </button>
          </form>

          {loading && <p className="mt-4 text-gray-600">Loading video...</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </section>

      {/* Video Display Section */}
      {videoUrl && (
        <section className="video-section py-8 bg-green-50">
          <div className="container text-center">
            <h3 className="text-xl font-bold text-green-600 mb-4">🎥 Learn from Video</h3>
            <div className="flex justify-center">
              <iframe
                width="560"
                height="315"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* Upskilling and Reskilling Section */}
      <section className="sections py-8 bg-white">
        <div>
          <h1 className="text-3xl font-bold text-green-600 mb-4 container text-center">
            Green Skills for Sustainable Development
          </h1>
        </div>
        <div className="container text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-28">
            <div className="card p-6 bg-green-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-green-600">🔧 Upskilling</h3>
              <p className="text-gray-600 mb-4">
                Learn newer or more advanced skills in their current field (e.g., a farmer learning organic farming techniques).
              </p>
              <Link href="/upskill">
                <span className="btn btn-success text-white py-2 px-4 rounded-full bg-green-600 hover:bg-green-700 transition duration-300">
                  Start Learning
                </span>
              </Link>
            </div>
            <div className="card p-6 bg-green-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-green-600">🔁 Reskilling</h3>
              <p className="text-gray-600 mb-4">
                Learn to do a completely new kind of job (e.g., a coal miner learning how to install solar panels).
              </p>
              <Link href="/reskill">
                <span className="btn btn-success text-white py-2 px-4 rounded-full bg-green-600 hover:bg-green-700 transition duration-300">
                  Start Learning
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Green Cultural Skills */}
      <section className="sections py-8 bg-white">
        <div>
          <h1 className="text-3xl font-bold text-green-600 mb-4 container text-center">
            Green Cultural Skills
          </h1>
        </div>
        <div className="container text-center px-28">
          <div className="card p-6 bg-green-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-600">🔁 Reskilling</h3>
            <p className="text-gray-600 mb-4">
              Learn to do a completely new kind of job (e.g., a coal miner learning how to install solar panels).
            </p>
            <Link href="/cultural-skills">
              <span className="btn btn-success text-white py-2 px-4 rounded-full bg-green-600 hover:bg-green-700 transition duration-300">
                Start Learning
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Green Economy Explanation */}
      <section className="green-economy py-8 bg-green-50">
        <div className="container text-center">
          <h3 className="text-xl font-bold text-green-600 mb-4">🌱 Green Economy</h3>
          <p className="text-lg text-gray-700">
            Jobs and industries that protect the environment, use clean energy, reduce waste, and promote sustainability.
          </p>
          <div className="mt-6 flex justify-center items-center">
            <Image
              src="/green-economy.jpeg"
              alt="Green Economy"
              width={80}
              height={80}
            />
            <p className="ml-4 text-gray-600">Supporting eco-friendly, future-ready jobs.</p>
          </div>
        </div>
      </section>

      {/* Short Summary */}
      <section className="summary py-8 bg-white">
        <div className="container text-center">
          <h3 className="text-xl font-semibold text-green-600 mb-4">🛠️ In Short</h3>
          <p className="text-gray-700">
            We give workers the tools and training they need to succeed in eco-friendly, future-ready jobs. Our programs focus on sustainable livelihoods and upskilling for a greener economy.
          </p>
        </div>
      </section>
    </div>
  );
}