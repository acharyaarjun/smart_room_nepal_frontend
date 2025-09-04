
"use client";
import React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/common";
export default function BecomeAHost() {
  const registrationSteps = [
    {
      step: 1,
      title: "Complete Registration",
      description: "Fill out the registration form with your personal details including a valid phone number for verification.",
      icon: "📝", 
    },
    {
      step: 2,
      title: "Upload Documents",
      description: "Upload clear images of your citizenship documents (front and back) for verification purposes.",
      icon: "🖼️", 
    },
    {
      step: 3,
      title: "Admin Verification",
      description: "Wait for admin approval. You'll receive a confirmation message on your registered phone number.",
      icon: "✅",
    },
    {
      step: 4,
      title: "Access Dashboard",
      description: "Once approved, you'll gain access to your host dashboard where you can manage your properties.",
      icon: "💻",
    },
    {
      step: 5,
      title: "Add Properties",
      description: "Add your property details, including images, location, and pricing, to list them on the platform.",
      icon: "🏠",
    },
    {
      step: 6,
      title: "Property Listed",
      description: "Your property is now listed on our platform and visible to potential renters.",
      icon: "📋",
    },
  ];

  const whatToExpect = [
    {
      title: "Document Verification",
      description: "Our admin team will verify your submitted documents within 24-48 hours.",
    },
    {
      title: "SMS Notification",
      description: "You'll receive an SMS on your registered phone number with the verification status.",
    },
    {
      title: "Dashboard Access",
      description: "Upon approval, you'll get immediate access to your host dashboard.",
    },
    {
      title: "Property Management",
      description: "You can add multiple properties and manage them easily.",
    },
  ];

  const hostResponsibilities = [
    {
      title: "Maintain Property",
      description: "Ensure your rental rooms are clean, safe, and well-maintained for renters.",
      icon: "🛠️",
    },
    {
      title: "Communicate with Renters",
      description: "Respond promptly to inquiries and coordinate check-ins with tenants.",
      icon: "💬",
    },
    {
      title: "Ensure Safety",
      description: "Provide a secure environment, including working locks and emergency contacts.",
      icon: "🔐",
    },
    {
      title: "Handle Payments",
      description: "Manage rent collection and deposits through our secure payment system.",
      icon: "💸",
    },
  ];

  return (
    <div className="w-full">
      <Breadcrumb
        title="Become A Host"
        description=" Follow these steps to become a host and start listing your rooms on Find Home Nepal"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "BecomeAHost" }]}
      />
      {/* Registration Steps Section */}
      <section className="w-full py-12">
        <div className="container mx-auto px-4 max-w-8xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registrationSteps.map((step, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-white shadow-sm border-gray-200 dark:bg-dropdown relative"
              >
                <div className="absolute -top-4 left-4 bg-black text-white rounded-br-xl w-12 h-10 flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div className="mt-6 text-center">
                  <div className="text-4xl mb-2">{step.icon}</div> {/* Placeholder for icon */}
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="w-full py-12">
        <div className="container mx-auto px-4 max-w-3xl bg-gray-50 dark:bg-dropdown p-2">
          <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
          <p className=" mb-6">Our streamlined process makes becoming a host in Nepal simple and secure</p>
          <div className="space-y-4">
            {whatToExpect.map((item, index) => (
              <div key={index} className="flex items-start ">
                <span className="text-green-500 mr-2 mt-1">✔</span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Host Responsibilities Section */}
      <section className="w-full py-12 bg-white dark:bg-dropdown">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Host Responsibilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hostResponsibilities.map((responsibility, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-white dark:bg-dropdown shadow-sm border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="text-4xl mb-2">{responsibility.icon}</div> {/* Placeholder for icon */}
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {responsibility.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{responsibility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Need More Assistance?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Have questions about hosting on Smart Room Nepal? Start your journey by logging in to manage your rooms or contact us for support.
          </p>
          <Link
            href="/login"
            className="px-6 py-3 bg-[#5143d9] hover:bg-[#7f78c0] dark:bg-dropdown text-white rounded-md font-medium mr-4 transition-colors duration-300"
          >
            Become a Host
          </Link>
          <Link
            href="/contact-us"
            className="px-6 py-3 bg-[#5143d9] hover:bg-[#7f78c0] dark:bg-dropdown text-white rounded-md font-medium transition-colors duration-300"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
