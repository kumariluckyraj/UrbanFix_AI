"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  return (
    
    <div className="home-page">
       
      
      <section
  className="text-center py-20 text-white bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/bg4.jpeg')" }}
>
  <div className="bg-black bg-opacity-50 px-4 py-12 rounded-lg max-w-4xl mx-auto">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
    Empowering Artisans, Preserving Cultures
    </h1>
    <p className="text-lg md:text-xl">
      
    Join a movement where tradition meets technology. Fair, global, and green.
    </p>
  </div>
</section>
{/* Call to Action Buttons */}
<section className="py-12 bg-green-50 text-center">
  <div className="max-w-4xl mx-auto px-4">
    <h3 className="text-2xl font-semibold mb-6 text-green-800">Ready to make a difference?</h3>
    <div className="flex flex-col md:flex-row justify-center gap-6">
      <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition">
       <Link href={"/learn"}>Explore Themes</Link>
      </button>
     
      <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition">
       <Link href={"/login"}>Join the Movement</Link>
      </button>
    </div>
  </div>
</section>


<section className="py-12  text-center">
  <div className="max-w-4xl mx-auto px-6">
    <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
      In todays fast-paced global economy, growing wage disparities, the erosion of cultural traditions, and mounting environmental damage threaten the fabric of inclusive and sustainable development. Many communities are left behind as traditional livelihoods disappear and profit-driven models dominate. Our approach bridges technology with cultural heritage and equitable economics — empowering creators, artisans, and innovators to build sustainable futures. By combining modern tools with timeless values, we aim to create businesses that are not just profitable, but deeply rooted in social and cultural responsibility.
    </p>
    <button className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition">
     <Link href={"/about"}> Read More</Link>
    </button>
  </div>
</section>

<section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold text-green-700 mb-12">How It Works</h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
      {/* Step 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 text-green-700 text-2xl font-bold mx-auto">
          1
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center">Learn about the challenge</h3>
        <p className="text-gray-700 text-sm text-center">
          Understand the core problems and explore resources that guide your innovation journey.
        </p>

      </div>

      {/* Step 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 text-green-700 text-2xl font-bold mx-auto">
          2
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center">Submit or join a team</h3>
        <p className="text-gray-700 text-sm text-center">
          Bring your idea and register to participate.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition my-2 mx-12">
       <Link href={"/login"}> Register </Link>
      </button>
      </div>

      {/* Step 3 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 text-green-700 text-2xl font-bold mx-auto">
          3
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center">Get mentored</h3>
        <p className="text-gray-700 text-sm text-center">
          Receive support from experts in sustainability, culture, and business to shape your solution.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition mx-5 my-2">
       <Link href={"/learn"}> Start Learning</Link>
      </button>
      </div>

      {/* Step 4 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 text-green-700 text-2xl font-bold mx-auto">
          4
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center">Showcase & scale</h3>
        <p className="text-gray-700 text-sm text-center">
          Present your work to a global audience and access opportunities to grow your impact.
        </p>
        <button className=" bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition mx-14 my-2">
       <Link href={"/sell"}> Sell</Link>
      </button>
      </div>
    </div>
  </div>
</section>


      {/* Testimonials Section */}
      <section className="py-20  text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12">Stories That Inspire</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Meena */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Meena - Weaver"
                  width={100}
                  height={100}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <h5 className="font-medium text-lg">Meena - Weaver, India</h5>
              <p className="text-gray-600 mt-2 max-w-xs">“SustainaLink gave my art a global stage. Now my daughter dreams bigger.”</p>
            </div>

            {/* Elijah */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Elijah - Farmer"
                  width={100}
                  height={100}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <h5 className="font-medium text-lg">Elijah - Farmer, Kenya</h5>
              <p className="text-gray-600 mt-2 max-w-xs">“Fair prices and fair hope. I finally feel respected for my work.”</p>
            </div>

            {/* Ana */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Ana - Basket Maker"
                  width={100}
                  height={100}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <h5 className="font-medium text-lg">Ana - Basket Maker, Peru</h5>
              <p className="text-gray-600 mt-2 max-w-xs">“My village sees pride and profit from our traditions now.”</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
