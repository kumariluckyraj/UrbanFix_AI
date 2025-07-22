import React from 'react'
import Link from 'next/link';
const page = () => {//
  return (
    <div>
      <section className="py-12  text-center">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-green-700">🌍 About Us</h2>
    <h3 className="text-2xl font-semibold mb-4 text-green-600">Our Vision: A Sustainable Future for All</h3>
    <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
      In an era of rapid economic growth and globalization, the world is facing a unique set of challenges that threaten the balance between economic development, cultural preservation, and environmental sustainability. While profitability drives industries forward, it often comes at the expense of workers, traditional knowledge, and the planet itself. We believe that business can—and should—be a force for good, driving innovation that uplifts communities, protects our shared heritage, and builds a resilient future for generations to come.
    </p>

    <h3 className="text-2xl font-semibold mb-4 text-green-600">The Problems We Are Addressing</h3>
    
    <div className="space-y-8">
      {/* Wage Gaps Section */}
      <div>
        <h4 className="text-xl font-medium text-green-700 mb-2">Wage Gaps & Economic Inequality</h4>
        <p className="text-gray-800">
          As industries grow , income disparities are widening. Low wages in sectors such as agriculture, craft, and manufacturing disproportionately affect vulnerable communities. Many workers, especially in emerging markets, lack the opportunity for economic mobility, pushing them further into poverty. The imbalance between profit-driven corporations and fair economic compensation is undeniable.
        </p>
        
      </div>

      {/* Loss of Cultural Heritage Section */}
      <div>
        <h4 className="text-xl font-medium text-green-700 mb-2">Loss of Cultural Heritage</h4>
        <p className="text-gray-800">
          Small-scale artisans, indigenous communities, and local craftspeople are facing an existential threat. As the demand for mass-produced goods grows, these cultural practices risk being lost. Traditional knowledge, skills, and crafts are passed down through generations but struggle to survive in an increasingly globalized market. The preservation of culture and heritage is not just important for identity—it&aposs vital for a sustainable, diverse world.
        </p>
      </div>

      {/* Environmental Degradation Section */}
      <div>
        <h4 className="text-xl font-medium text-green-700 mb-2">Environmental Degradation</h4>
        <p className="text-gray-800">
          From unsustainable supply chains to over-exploitation of natural resources, the consequences of unchecked industrialization are becoming apparent. Many industries prioritize short-term profits over environmental health, contributing to climate change, habitat destruction, and the depletion of biodiversity. We are at a critical juncture where we must redefine how businesses interact with the planet.
        </p>
      </div>
    </div>

    <h3 className="text-2xl font-semibold mb-4 text-green-600 mt-12">Our Approach: Innovating with Purpose</h3>
    <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
      We believe in the transformative power of technology, culture, and equity. Our mission is to combine these three pillars to create a new breed of business models that don&apost just focus on financial success but also contribute positively to society and the environment. By leveraging modern tools, data, and insights, we aim to foster solutions that can tackle the world&aposs most pressing challenges while preserving cultural heritage and promoting sustainable growth.
    </p>

    {/* Approach Sections */}
    <div className="space-y-8">
      {/* Technology for Sustainable Growth */}
      <div>
        <h4 className="text-xl font-medium text-green-700 mb-2">Technology for Sustainable Growth</h4>
        <p className="text-gray-800">
          We see technology as a catalyst for innovation. Whether it&aposs through digital platforms that connect artisans with global markets, AI-driven tools that help businesses reduce waste, or blockchain solutions for transparent supply chains, we leverage the power of tech to drive sustainable change.
        </p>
      </div>

      {/* Cultural Preservation */}
      <div>
        <h4 className="text-xl font-medium text-green-700 mb-2">Cultural Preservation at the Core</h4>
        <p className="text-gray-800">
          Culture is not just something to be preserved but something that can drive modern innovation. We integrate traditional knowledge into modern business practices, offering opportunities for indigenous communities and local artisans to preserve their cultural heritage while scaling their businesses. We believe that cultural richness is a competitive advantage in today&aposs world, creating deeper connections with consumers who care about where their products come from.
        </p>
      </div>

      {/* Equitable Economics */}
      <div>
        <h4 className="text-xl font-medium text-green-700 mb-2">Equitable Economics</h4>
        <p className="text-gray-800">
          We are committed to creating business models that are built on fairness and inclusivity. This means designing transparent profit-sharing systems, ensuring fair wages, and creating opportunities for those at the bottom of the economic ladder to participate in the global economy. We envision a world where businesses thrive by ensuring that their success is shared equitably, from the ground up.
        </p>
      </div>
    </div>

    <h3 className="text-2xl font-semibold mb-4 text-green-600 mt-12">Our Commitment to Impact</h3>
    <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
      We understand that change doesn&apost happen overnight, but we are determined to make a lasting impact. Through our platform, we empower individuals and businesses to rethink the way they create, share, and profit. By connecting communities with the right tools, knowledge, and networks, we hope to ignite a wave of innovation that transcends industries and promotes a just, sustainable world.
    </p>

    <h3 className="text-2xl font-semibold mb-4 text-green-600 mt-12">Why It Matters</h3>
    <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
      This initiative is not just about creating business solutions—it&aposs about shaping a future where innovation and responsibility go hand in hand. We want to create opportunities that preserve cultural practices, honor indigenous knowledge, provide fair wages, and protect our planet for future generations. It&aposs time to reimagine the way business is done and ensure that everyone has a chance to benefit from sustainable growth.
    </p>

    <h3 className="text-2xl font-semibold mb-4 text-green-600 mt-12">Join Us</h3>
    <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
      We invite you to be part of this movement. Whether you&aposre an innovator, artisan, worker, or investor, there&aposs a role for you in building a sustainable and inclusive future. Together, we can create a new business landscape that values people, culture, and the planet, ensuring that success is not just measured in profit, but in the positive impact we create for the world.
    </p>
    <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition">
       <Link href={"/login"}> Join the Movement</Link>
      </button>
  </div>
</section>

    </div>
  )
}

export default page
