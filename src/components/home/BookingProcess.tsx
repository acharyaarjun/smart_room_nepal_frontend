import React from "react";
import {
  FaSearch,
  FaUserPlus,
  FaEye,
  FaShieldAlt,
  FaFileContract,
  FaCheckCircle,
} from "react-icons/fa";

export default function BookingProcess() {
  const processSteps = [
    {
      id: 1,
      icon: FaSearch,
      title: "Search & Filter",
      description:
        "Browse thousands of verified rooms using our smart filters for location, budget, and amenities.",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500",
    },
    {
      id: 2,
      icon: FaUserPlus,
      title: "Create Account",
      description:
        "Sign up with your email or phone number. Quick verification process to ensure security.",
      color:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-500",
    },
    {
      id: 3,
      icon: FaEye,
      title: "View & Visit",
      description:
        "Schedule virtual tours or physical visits. Chat directly with property owners through our platform.",
      color:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      iconBg: "bg-green-500",
    },
    {
      id: 4,
      icon: FaShieldAlt,
      title: "Verify & Secure",
      description:
        "We verify property documents, landlord credentials, and provide legal agreement templates.",
      color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      iconBg: "bg-red-500",
    },
    {
      id: 5,
      icon: FaFileContract,
      title: "Book & Pay",
      description:
        "Secure online payment with digital receipts. Choose from multiple payment options available.",
      color:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-500",
    },
    {
      id: 6,
      icon: FaCheckCircle,
      title: "Move In",
      description:
        "Get your keys and move in! Enjoy 24/7 support throughout your stay for any assistance needed.",
      color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
      iconBg: "bg-teal-500",
    },
  ];

  return (
    <section id="our-process" className="w-full py-12">
      <div className="container">
        {/* Header */}
        <div className="w-full text-center">
          <h1 className="font-bold text-5xl capitalize mb-8">
            Booking Process
          </h1>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => {
            return (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-dropdown rounded-2xl p-6 shadow-custom hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-12 w-12 rounded-full ${step.iconBg} flex items-center justify-center shadow-md`}
                      >
                        <step.icon className="text-white text-xl" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-normal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
