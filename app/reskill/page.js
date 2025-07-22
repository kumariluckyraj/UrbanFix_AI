"use client"
import { useState } from "react";
import Link from "next/link";
import "./reskill.css";

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
          <h3>1. Green Finance</h3>
          <ul>
            <li>Sustainable investment: Training in how to manage funds for eco-friendly projects (e.g., renewable energy investments, sustainable business models).</li>
            <li>Carbon trading: Understanding how carbon credits work and how businesses can participate in carbon trading markets</li>
            <li>Socially responsible investing (SRI): Learning to evaluate investments based on their environmental and social impact</li>
          </ul>
          <div controls
        width="100%"
        onEnded={() => handleCourseCompletion("green-tech")} className="video-container" >
            <video className="reskill-video" controls>
              <source src="/videos/green-finance.mp4" type="video/mp4" />
             
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


        {/* Renewable Energy Section */}
        <div className="reskill-card">
          <h3>2. Renewable Energy</h3>
          <ul>
            <li>Solar energy installation: How to set up and maintain solar panels for homes or businesses.</li>
            <li>Wind energy: Learn how to install and maintain wind turbines.</li>
            <li>Battery storage and energy management: Understanding how to store renewable energy efficiently for later use.</li>
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

        {/* Sustainable Construction and Green Building Section */}
        <div className="reskill-card">
          <h3>3. Sustainable Construction and Green Building</h3>
          <ul>
            <li>Eco-friendly building practices: Learning how to construct buildings using sustainable materials like bamboo, recycled metal, or non-toxic paints.</li>
            <li>Energy-efficient design: How to design homes or commercial buildings that require less energy.</li>
            <li>Green roofing and insulation: Installing eco-friendly insulation and green roofs to improve energy efficiency.</li>
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
          <h3>4. Sustainable Construction and Green Building</h3>
          <ul>
            <li>Eco-friendly building practices: Learning how to construct buildings using sustainable materials like bamboo, recycled metal, or non-toxic paints.</li>
            <li>Energy-efficient design: How to design homes or commercial buildings that require less energy.</li>
            <li>Green roofing and insulation: Installing eco-friendly insulation and green roofs to improve energy efficiency.</li>
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
          <h3>5. Sustainable Construction and Green Building</h3>
          <ul>
            <li>Eco-friendly building practices: Learning how to construct buildings using sustainable materials like bamboo, recycled metal, or non-toxic paints.</li>
            <li>Energy-efficient design: How to design homes or commercial buildings that require less energy.</li>
            <li>Green roofing and insulation: Installing eco-friendly insulation and green roofs to improve energy efficiency.</li>
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
          <h3>6. Electric Vehicles (EV) and Infrastructure</h3>
          <ul>
            <li>EV charging stations: Training workers to install and maintain EV charging stations.</li>
            <li>Electric vehicle maintenance: Learning how to service and repair electric cars and buses.</li>
   
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
          <h3>7. Sustainable Agriculture and Forestry</h3>
          <ul>
            <li>Organic farming: Transitioning from conventional farming to organic, chemical-free farming.</li>
            <li>Agroforestry and permaculture: Understanding how to integrate trees and other plants into farming systems for environmental and financial benefits.</li>
            <li>Water conservation techniques: Learning efficient irrigation systems to conserve water in agriculture.</li>
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
          <h3>8. Waste Management and Recycling</h3>
          <ul>
            <li>Zero waste management: Learning how to reduce waste, reuse materials, and recycle effectively.</li>
            <li>E-waste recycling: Understanding how to safely recycle electronics and avoid harmful environmental impacts.</li>
            <li>Composting: Learning how to turn organic waste into useful compost for agriculture or gardening.</li>
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
          <h3>9. Sustainable Transport</h3>
          <ul>
            <li>Green logistics: Learning how to make supply chains more eco-friendly by reducing carbon emissions.</li>
            <li>Bicycle mechanics: A reskilling option for workers to learn how to repair and maintain bikes, which are more sustainable transport options.</li>
            <li>Public transport development: Working in the development or management of sustainable, eco-friendly public transportation systems.</li>
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
          <h3>10. Environmental Policy and Advocacy</h3>
          <ul>
            <li>Environmental law: Understanding regulations related to land use, water use, carbon emissions, etc..</li>
            <li>Sustainability advocacy: Training people to become environmental activists or work in non-governmental organizations (NGOs) promoting green policies</li>
            <li>Carbon offset programs: Learning how businesses can offset their emissions by investing in renewable energy or reforestation projects.</li>
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
          <h3>11. Green Finance</h3>
          <ul>
            <li>Sustainable investment: Training in how to manage funds for eco-friendly projects (e.g., renewable energy investments, sustainable business models).</li>
            <li>Carbon trading: Understanding how carbon credits work and how businesses can participate in carbon trading markets</li>
            <li>Socially responsible investing (SRI): Learning to evaluate investments based on their environmental and social impact</li>
          </ul>
          <div controls
        width="100%"
        onEnded={() => handleCourseCompletion("green-tech")} className="video-container" >
            <video className="reskill-video" controls>
              <source src="/videos/green-finance.mp4" type="video/mp4" />
             
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

          </div>
        </div>

        {/* Add more sections for other skills */}
        {/* ... */}

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
  );
}
