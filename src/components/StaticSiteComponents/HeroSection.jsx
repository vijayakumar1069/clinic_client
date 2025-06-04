import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-r scroll-mt-16 from-primary to-primary/90 pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mb-6">
              Book Appointments Easily with Our Clinic Management System
            </h1>
            <p className="text-white text-base md:text-lg mb-6 opacity-90">
              Our clinic platform simplifies the appointment process for both
              doctors and patients. Book slots, manage schedules, and receive
              real-time updates — all from one easy-to-use system.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="#about"
                className="bg-white text-primary hover:bg-opacity-90 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Learn More
              </a>
              <a
                href="#contact"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 py-3 rounded-md font-medium transition-colors"
              >
                Book Appointment
              </a>
            </div>
          </div>

          {/* Image Container */}
          <div className="md:w-1/2 w-full max-w-[500px] flex justify-center">
            <div className="relative w-full aspect-square md:aspect-video">
              <div className="absolute inset-0 bg-white opacity-10 rounded-2xl transform rotate-6 -z-10" />
              <Image
                src="/doctor.jpg" 
                alt="Clinic Appointment Dashboard"
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-2xl shadow-2xl object-cover"
                style={{
                  transform: "rotateZ(0.01deg)", // Fixes blurry text in some browsers
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        <svg
          className="absolute bottom-0 w-full border-0 outline-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path
            fill="#f7f9f8"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
