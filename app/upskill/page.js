"use client";
import { useState } from "react";
import Link from "next/link";
import "./upskill.css";

export default function Upskilling() {
  // State to track which course is completed
  const [completedCourses, setCompletedCourses] = useState({});

  const handleCourseCompletion = (course) => {
    setCompletedCourses({ ...completedCourses, [course]: true });
  };

  const generateCertificate = (course) => {
    return (
      <div className="certificate">
        <h3>Congratulations!</h3>
        <p>You have completed the {course} course. Here is your certificate:</p>
        <img src="/path/to/certificate-image.png" alt="Certificate" />
      </div>
    );
  };

  const calculateDiscount = () => {
    const discount = Object.keys(completedCourses).length * 0.2; // 20% per course completed
    return discount > 1 ? 1 : discount; // Max 100% discount
  };

  return (
    <div className="upskill-page">
      <div className="upskill-container">
        <h2 className="section-title">Top Upskills for the Green Economy</h2>

        {/* Green Technology Skills Section */}
        <div className="upskill-card">
          <h3>1. Green Technology Skills</h3>
          <ul>
            <li>Solar panel installation & maintenance</li>
            <li>Wind turbine technology</li>
            <li>Electric vehicle (EV) servicing</li>
            <li>Smart grid systems & energy efficiency tools</li>
          </ul>
          <div className="video-container">
            <video
              className="upskill-video"
              controls
              onEnded={() => handleCourseCompletion("Green Technology Skills")}
            >
              <source src="path/to/your-video.mp4" type="video/mp4" />
              <source src="path/to/your-video.webm" type="video/webm" />
              <source src="path/to/your-video.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Sustainable Agriculture Skills Section */}
        <div className="upskill-card">
          <h3>2. Sustainable Agriculture Skills</h3>
          <ul>
            <li>Organic farming techniques</li>
            <li>Natural composting and permaculture</li>
            <li>Water conservation and irrigation systems</li>
            <li>Agroforestry and biodiversity preservation</li>
          </ul>
          <div className="video-container">
            <video
              className="upskill-video"
              controls
              onEnded={() => handleCourseCompletion("Sustainable Agriculture Skills")}
            >
              <source src="path/to/your-video.mp4" type="video/mp4" />
              <source src="path/to/your-video.webm" type="video/webm" />
              <source src="path/to/your-video.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="upskill-card">
          <h3>3. Digital & Tech Skills</h3>
          <ul>
            <li>Selling products online (e-commerce)</li>
            <li>Social media marketing for handmade/eco-products</li>
            <li>Basic coding, data entry, or digital payments</li>
            
          </ul>
          <div className="video-container">
            <video
              className="upskill-video"
              controls
              onEnded={() => handleCourseCompletion("Sustainable Agriculture Skills")}
            >
              <source src="path/to/your-video.mp4" type="video/mp4" />
              <source src="path/to/your-video.webm" type="video/webm" />
              <source src="path/to/your-video.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="upskill-card">
          <h3>4. Sustainable Business Skills</h3>
          <ul>
            <li>How to create eco-conscious products and packaging</li>
            <li>Inventory management with low waste</li>
           
            <li>Understanding carbon footprints and climate impact</li>
          </ul>
          <div className="video-container">
            <video
              className="upskill-video"
              controls
              onEnded={() => handleCourseCompletion("Sustainable Agriculture Skills")}
            >
              <source src="path/to/your-video.mp4" type="video/mp4" />
              <source src="path/to/your-video.webm" type="video/webm" />
              <source src="path/to/your-video.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="upskill-card">
          <h3>5. Cultural Entrepreneurship</h3>
          <ul>
            <li>Telling the story behind a craft or product</li>
            <li>Branding and pricing handcrafted or local goods</li>
            <li>Working with cooperatives or fair trade systems</li>
            
          </ul>
          <div className="video-container">
            <video
              className="upskill-video"
              controls
              onEnded={() => handleCourseCompletion("Sustainable Agriculture Skills")}
            >
              <source src="path/to/your-video.mp4" type="video/mp4" />
              <source src="path/to/your-video.webm" type="video/webm" />
              <source src="path/to/your-video.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="upskill-card">
          <h3>6. Green Supply Chain Knowledge</h3>
          <ul>
            <li>Sourcing ethical materials</li>
            <li>Traceability and transparency tools</li>
            <li>Logistics with a low environmental impact</li>
            
          </ul>
          <div className="video-container">
            <video
              className="upskill-video"
              controls
              onEnded={() => handleCourseCompletion("Sustainable Agriculture Skills")}
            >
              <source src="path/to/your-video.mp4" type="video/mp4" />
              <source src="path/to/your-video.webm" type="video/webm" />
              <source src="path/to/your-video.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="upskill-card">
          <h3>7. Financial Literacy</h3>
          <ul>
            <li>Budgeting and saving for small business owners</li>
            <li>Accessing green loans or eco-grants</li>
            <li>Using mobile banking tools</li>
            
          </ul>
          <div className="video-container">
            <video
              className="upskill-video"
              controls
              onEnded={() => handleCourseCompletion("Sustainable Agriculture Skills")}
            >
              <source src="path/to/your-video.mp4" type="video/mp4" />
              <source src="path/to/your-video.webm" type="video/webm" />
              <source src="path/to/your-video.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        

        {/* Discount Section */}
        {Object.keys(completedCourses).length > 0 && (
          <section className="discount">
            <h3>You&aposve earned a discount!</h3>
            <p>
              Congratulations! You&aposve completed {Object.keys(completedCourses).length} course(s).
              You get a {calculateDiscount() * 100}% discount on your next purchase!
            </p>
            <Link href="/shoping">
              <a className="btn-shop">Shop Now</a>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
