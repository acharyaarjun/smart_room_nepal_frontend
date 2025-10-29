
"use client";
import React from "react";
import { Breadcrumb } from "@/components/common"; 


export default function MissionVision() {
  return (
    <div className="w-full">
      {/* Header Section */}
      {/* <section className="w-full py-12 bg-[#4a419c] text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Our Mission & Vision</h1>
        <p className="text-lg text-gray-300">
          Discover the purpose and future of Find Home Nepal in providing quality room renting services.
        </p>
      </section> */}
       <Breadcrumb
              title="Our Mission & Vision"
              description="Discover the purpose and future of Find Home Nepal in providing quality room renting services."
              breadcrumb={[{ label: "Home", href: "/" }, { label: "MissionVision" }]}
            />

      {/* Mission Section */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Mission</h2>
          <div className="border rounded-lg p-6 bg-white shadow-sm border-gray-200">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              At Find Home Nepal, our mission is to connect landlords with students and professionals seeking affordable, safe, and comfortable room rentals across Nepal. We strive to simplify the renting process with transparent listings, secure transactions, and dedicated support, ensuring every tenant finds their ideal home.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="w-full py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Our Vision</h2>
          <div className="border rounded-lg p-6 bg-white shadow-sm border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Our vision is to become the leading platform for room rentals in Nepal, fostering a community where every landlord and renter thrives. We aim to innovate with technology, expand our reach to every city, and set a new standard for trust, convenience, and quality in the housing market.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
