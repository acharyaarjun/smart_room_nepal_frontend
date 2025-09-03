"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import contactImage from "@/assets/images/contact/contact.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function ContactUs() {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ name, email, mobile, message }); // form logic
  };

  return (
    <section className="w-full min-h-screen flex flex-col py-12 lg:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6 text-left">
            Let's connect and get to know <br />each other
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-left">
            Looking for a smart and comfortable space? Get in touch with us today to book your room or ask any questions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm1 0v10h14V3H3zm2 5a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm8-3a1 1 0 100 2h2a1 1 0 100-2h-2zm0 3a1 1 0 100 2h2a1 1 0 100-2h-2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Call us</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Imprudence attachment him his for sympathize. Large above be to means.</p>
            <div className="flex justify-center items-center gap-2">
              <p className="text-blue-500 px-2 py-1 rounded">+123 456 789</p>
              <p className="text-blue-500 px-2 py-1 rounded">(222) 4567 586</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Email us</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Large above be to means. Him his for sympathize.</p>
            <p className="text-blue-500 px-2 py-1 rounded">example@gmail.com</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-center relative">
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-100 rounded-full p-3">
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Social media</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Sympathize large above be to means.</p>
            <div className="flex justify-center space-x-4">
              <Link href="#" className="text-blue-600 hover:text-blue-800">
                <FaFacebookF className="text-2xl" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-pink-500 hover:text-pink-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-3.784.97-5.441 2.108-1.658-1.138-3.34-1.964-5.44-2.108a9.822 9.822 0 01-3-8.99A9.827 9.827 0 017.008 3.38a9.827 9.827 0 019.983 0 9.827 9.827 0 013.009 4.522 9.822 9.822 0 01-3.559 8.99z" />
                </svg>
                <span className="sr-only">Instagram</span>
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
            <div className="absolute top-[-32] right-4 ">
              <svg className="fill-yellow-500 w-16 h-16" viewBox="0 0 77 77">
                <path d="M76.997,41.258 L45.173,41.258 L67.676,63.760 L63.763,67.673 L41.261,45.171 L41.261,76.994 L35.728,76.994 L35.728,45.171 L13.226,67.673 L9.313,63.760 L31.816,41.258 L-0.007,41.258 L-0.007,35.725 L31.816,35.725 L9.313,13.223 L13.226,9.311 L35.728,31.813 L35.728,-0.010 L41.261,-0.010 L41.261,31.813 L63.763,9.311 L67.676,13.223 L45.174,35.725 L76.997,35.725 L76.997,41.258 Z"></path>
              </svg>
            </div>
          </div>
        </div>
        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <Image src={contactImage} alt="Contact Illustration" width={600} height={400} className="w-full h-auto object-cover rounded-2xl shadow-xl" />
          </div>
          {/* Right: Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Send us message
            </h2>
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
              <button type="submit" className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.9228715259774!2d83.98915697455696!3d28.240020601798584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995946a3a83989f%3A0x6725cf65b414222f!2sPrithvi%20Narayan%20Campus!5e0!3m2!1sen!2snp!4v1756884316920!5m2!1sen!2snp"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
