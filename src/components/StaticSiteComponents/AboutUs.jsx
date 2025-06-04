import React from 'react';

const AboutUs = () => {
  return (
    <div id='about' className="bg-white py-10 px-4 sm:px-6 lg:px-8 ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Us</h2>
      <p className="text-gray-600 text-base leading-relaxed mb-4">
        Welcome to <span className="font-semibold text-indigo-600">MediConnect</span>, your trusted partner in managing doctor appointments effortlessly. Our mission is to simplify the healthcare experience by making appointment booking easy, fast, and reliable.
      </p>
      <p className="text-gray-600 text-base leading-relaxed mb-4">
        Whether you need a general physician, a specialist, or a follow-up consultation, our app helps you find the right doctor and schedule your visit in just a few clicks. With real-time availability, reminders, and secure access to your records, we put your health first.
      </p>
      <p className="text-gray-600 text-base leading-relaxed">
        We’re committed to improving patient care through technology. MediConnect connects patients with certified professionals and clinics, ensuring quality healthcare is always within reach.
      </p>
    </div>
  );
};

export default AboutUs;
