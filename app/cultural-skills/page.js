"use client"
import { useState } from "react";
import Link from "next/link";
import "./cultural.css"

export default function Upskilling() {
    const [completedCourses, setCompletedCourses] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullscreenImage, setFullscreenImage] = useState(false);

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

  
    const handleCourseCompletion = (course) => {
      setCompletedCourses((prev) => ({ ...prev, [course]: true }));
    };
  
    const isCompleted = (course) => completedCourses[course];
  const calculateDiscount = () => {
    const discount = Object.keys(completedCourses).length * 0.2; // 20% per course completed
    return discount > 1 ? 1 : discount; // Max 100% discount
  };

  return (
    <div className="reskill-page">
      <div className="reskill-container">
        <h2 className="section-title">Top Reskilling Areas for the Green Economy</h2>
        <div className="reskill-card">
          <h3>1. Pottery Making</h3>
          <ul>
            <li>Techniques: Hand-building, wheel-throwing, slip casting</li>
            <li>Natural materials: Using local and sustainable clay</li>
            <li>Eco-firing methods: Smokeless kilns, solar kilns</li>
          </ul>
          <div controls
        width="100%"
        onEnded={() => handleCourseCompletion("green-tech")} className="video-container" >
            <video className="reskill-video" controls>
              <source src="/videos/potery.mp4" type="video/mp4" />
             
              Your browser does not support the video tag.
            </video>
 {/* Show Certificate if course is completed */}
 {isCompleted("green-tech") && (
  <div className="certificate">
    <h3>🎉 Congratulations!</h3>
    <p>You&aposve completed the Green Finance course.</p>
    <img
  className="certificate-img"
  src="/certificate.jpg"
  alt="Certificate"
  onClick={() => setFullscreenImage(true)}
/>
{fullscreenImage && (
  <div className="fullscreen-overlay" onClick={() => setFullscreenImage(false)}>
    <img className="fullscreen-image" src="/certificate.jpg" alt="Fullscreen Certificate" />
    <a href="/certificate.jpg" download className="download-btn">Download Certificate</a>
  </div>
)}


    {/* Modal for fullscreen and download */}
    {isModalOpen && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <img src="/certificate.jpg" alt="Certificate Fullscreen" className="fullscreen-img" />
          <a href="/certificate.jpg" download className="download-btn">Download Certificate</a>
          <button className="close-btn" onClick={closeModal}>Close</button>
        </div>
      </div>
    )}
  </div>
)}

  {/* Discount Section */}
  {Object.keys(completedCourses).length > 0 && (
          <section className="discount">
            <h3>You&aposve earned a discount!</h3>
            <p>Congratulations! You&aposve completed {Object.keys(completedCourses).length} course(s). You get a {calculateDiscount() * 100}% discount on your next purchase!</p>
            <Link href="/shoping"
             className="btn-shop">Shop Now
            </Link>
          </section>
        )}
          </div>
        </div>
        <div className="reskill-card">
          <h3>2. Weaving & Textiles</h3>
          <ul>
          <li>Loom types: Backstrap loom, pit loom, frame loom</li>
            <li>Natural dyeing: Using plants and minerals for color</li>
            <li>Sustainable fibers: Hemp, organic cotton, bamboo</li>
          </ul>
          <div controls
        width="100%"
        onEnded={() => handleCourseCompletion("green-tech")} className="video-container" >
            <video className="reskill-video" controls>
              <source src="/videos/weaving.mp4" type="video/mp4" />
             
              Your browser does not support the video tag.
            </video>
 {/* Show Certificate if course is completed */}
 {isCompleted("green-tech") && (
  <div className="certificate">
    <h3>🎉 Congratulations!</h3>
    <p>You&aposve completed the Green Finance course.</p>
    <img
  className="certificate-img"
  src="/certificate.jpg"
  alt="Certificate"
  onClick={() => setFullscreenImage(true)}
/>
{fullscreenImage && (
  <div className="fullscreen-overlay" onClick={() => setFullscreenImage(false)}>
    <img className="fullscreen-image" src="/certificate.jpg" alt="Fullscreen Certificate" />
    <a href="/certificate.jpg" download className="download-btn">Download Certificate</a>
  </div>
)}


    {/* Modal for fullscreen and download */}
    {isModalOpen && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <img src="/certificate.jpg" alt="Certificate Fullscreen" className="fullscreen-img" />
          <a href="/certificate.jpg" download className="download-btn">Download Certificate</a>
          <button className="close-btn" onClick={closeModal}>Close</button>
        </div>
      </div>
    )}
  </div>
)}

  {/* Discount Section */}
  {Object.keys(completedCourses).length > 0 && (
          <section className="discount">
            <h3>You&apos
ve earned a discount!</h3>
            <p>Congratulations! You&aposve completed {Object.keys(completedCourses).length} course(s). You get a {calculateDiscount() * 100}% discount on your next purchase!</p>
            <Link href="/shoping"
             className="btn-shop">Shop Now
            </Link>
          </section>
        )}
          </div>
        </div>


       

        {/* Sustainable Construction and Green Building Section */}
        <div className="reskill-card">
          <h3>3.Woodwork & Carving</h3>
          <ul>
            <li>Tool skills: Traditional and power tools</li>
            <li>Eco-sourcing: Sustainable forestry, reclaimed wood</li>
            <li>Finishing: Natural oils, non-toxic polish

</li>
          </ul>
          <div className="video-container">
            <video className="reskill-video" controls>
              <source src="path/to/your-video.mp4" type="video/mp4" />
             
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="reskill-card">
          <h3>3. Folk & Tribal Painting</h3>
          <ul>
            <li>Styles: Madhubani, Warli, Gond, Pattachitra, etc.</li>
            <li>Materials: Using organic paints and handmade papers.</li>
            <li>Preservation: Digital archiving and storytelling behind the artwork.</li>
          </ul>
          <div className="video-container">
            <video className="reskill-video" controls>
              <source src="path/to/your-video.mp4" type="video/mp4" />
              <source src="path/to/your-video.webm" type="video/webm" />
              <source src="path/to/your-video.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="reskill-card">
          <h3>4. Traditional Music & Performance</h3>
          <ul>
            <li>Vocal & Instrument training: Classical and folk forms</li>
            <li>Sound recording: Basics of home studios for artists</li>
            <li>Stage presence: Performance skills and audience engagement</li>
          </ul>
          <div className="video-container">
            <video className="reskill-video" controls>
              <source src="path/to/your-video.mp4" type="video/mp4" />
              <source src="path/to/your-video.webm" type="video/webm" />
              <source src="path/to/your-video.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="reskill-card">
          <h3>5.Oral Storytelling & Folklore</h3>
          <ul>
            <li>Techniques: Voice modulation, body language, dramatic timing</li>
            <li>Language preservation: Recording and archiving oral traditions</li>
            <li>Scriptwriting: Turning stories into scripts or books</li>
   
          </ul>
          <div className="video-container">
            <video className="reskill-video" controls>
              <source src="path/to/your-video.mp4" type="video/mp4" />
              <source src="path/to/your-video.webm" type="video/webm" />
              <source src="path/to/your-video.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
          

        {/* Add more sections for other skills */}
        {/* ... */}

        {/* Discount Section */}
        {Object.keys(completedCourses).length > 0 && (
          <section className="discount">
            <h3>You&#39;
                      ve earned a discount!</h3>
            <p>Congratulations! You&aposve completed {Object.keys(completedCourses).length} course(s). You get a {calculateDiscount() * 100}% discount on your next purchase!</p>
            <Link href="/shoping"
             className="btn-shop">Shop Now
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
