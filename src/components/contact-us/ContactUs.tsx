"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import contactImage from "@/assets/images/contact/contact.png"; 

import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function ContactUs() {
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log({ name, email, mobile, message });
    // form logic
  };

  return (
    <section className="w-full min-h-screen flex flex-col py-12 lg:py-20 bg-white dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            Let's connect and get to know each other
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Looking for a smart and comfortable space? Get in touch with us today to book your room or ask any questions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-blue-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm1 0v10h14V3H3zm2 5a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm8-3a1 1 0 100 2h2a1 1 0 100-2h-2zm0 3a1 1 0 100 2h2a1 1 0 100-2h-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Call us</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Call us anytime you want.</p>
            <p className="text-blue-500">987654321</p>
            <p className="text-blue-500">061238433</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Email us</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Feel free to send a mail</p>
            <p className="text-blue-500">smartRoom@gmail.com</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-yellow-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Social media</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Visit our social media pages.</p>
            <div className="flex justify-center space-x-4">
              <Link href="#" className="text-blue-600 hover:text-blue-800">
                <FaFacebookF className="text-2xl" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-blue-400 hover:text-blue-600">
                <FaTwitter className="text-2xl" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-blue-700 hover:text-blue-900">
                <FaLinkedinIn className="text-2xl" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Illustration Image */}
          <div className="relative">
            <Image
              src={contactImage}
              alt="Contact Illustration"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* Right: Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Send us message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary focus:outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Mobile number *"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary focus:outline-none"
                required
              />
              <textarea
                placeholder="Message *"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary focus:outline-none h-32 resize-none"
                required
              ></textarea>
              <p className="text-sm text-gray-600 dark:text-gray-300">By submitting this form you agree to our terms and conditions.</p>
              <button
                type="submit"
                className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}