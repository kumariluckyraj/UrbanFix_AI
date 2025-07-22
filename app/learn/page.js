import Link from 'next/link';  // For navigating between pages
import Image from 'next/image';

export default function SkillsPage() {
  return (
    <div className="skills-page bg-light-green">
      <section className="intro py-8">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Upskilling & Reskilling for the Green Economy</h2>
          <p className="text-xl text-gray-700">Preparing for the future with the right tools and knowledge in eco-friendly industries.</p>
        </div>
      </section>

      {/* Upskilling and Reskilling Section */}
      <section className="sections py-8 bg-white">
        <div><h1 className="text-3xl font-bold text-green-600 mb-4 container text-center">Green Skills for Sustainable Development</h1></div>
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
      <section className="sections py-8 bg-white">
        <div><h1 className="text-3xl font-bold text-green-600 mb-4 container text-center">Green Cultural Skills</h1></div>
        <div className="container text-center"> 
          <div className='px-28'>
           
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
        </div>
      </section>

      {/* Green Economy Explanation Section */}
      <section className="green-economy py-8 bg-green-50">
        <div className="container text-center">
          <h3 className="text-xl font-bold text-green-600 mb-4">🌱 Green Economy</h3>
          <p className="text-lg text-gray-700">
            Jobs and industries that protect the environment, use clean energy, reduce waste, and promote sustainability.
          </p>
          <div className="mt-6 flex justify-center items-center">
            <Image
              src="/green-economy.jpeg"  // Change the path accordingly
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
