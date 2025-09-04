"use client";
import React from "react";
import Link from "next/link";
export default function Faq() {
  const landlordData = [
    { question: "How do I list my property on Find Home Nepal?", answer: "Log in to your account and navigate to the 'List Property' section to add your property details." },
    { question: "Is there a fee to list properties?", answer: "No, there is no fee to list properties on our platform." },
    { question: "How do I manage inquiries from students?", answer: "You can view and respond to inquiries through your landlord dashboard." },
    { question: "Can I verify student identities?", answer: "Yes, you can request identity verification through the platform's verification tools." },
    { question: "How do I update my property listing?", answer: "Go to your dashboard, select the property, and edit the details as needed." },
  ];

  const customerData = [
    { question: "How do I search for accommodation?", answer: "Use the search filters on the homepage to enter your location, budget, and room type, then browse the listings." },
    { question: "Is there a fee to use Find Home Nepal as a student?", answer: "No, there is no fee to use our platform as a student." },
    { question: "How do I contact a landlord about a property?", answer: "Click the 'Contact Landlord' button on the listing and use the provided phone or email." },
    { question: "Are the properties verified?", answer: "Yes, all properties are verified by our team for safety and quality." },
    { question: "Can I leave reviews for properties I’ve rented?", answer: "Yes, you can leave reviews via your account dashboard after renting." },
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="w-full py-12 bg-[#4a419c] text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-300">
          Find answers to common questions about Find Home Nepal, our services, and how to make the most of our platform.
        </p>
      </section>

      {/* Landlord FAQ Section */}
      <section className="w-full py-12 ">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">For Landlords</h2>
          <div className="space-y-4">
            {landlordData.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-2 bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700"
              >
                <details className="text-gray-800 dark:text-white">
                  <summary className="cursor-pointer list-none p-2">{item.question}</summary>
                  <p className="p-2 text-gray-600 dark:text-gray-300">{item.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer FAQ Section */}
      <section className="w-full py-12 ">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">For Customers</h2>
          <div className="space-y-4">
            {customerData.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-2 bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700"
              >
                <details className="text-gray-800 dark:text-white">
                  <summary className="cursor-pointer list-none p-2">{item.question}</summary>
                  <p className="p-2 text-gray-600 dark:text-gray-300">{item.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you couldn’t find the answer to your question, our support team is ready to help.
          </p>
          <Link
            href="/contact-us"
            className="px-6 py-3 bg-[#5143d9] hover:bg-[#7f78c0] text-white rounded-md font-medium transition-colors duration-300"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
