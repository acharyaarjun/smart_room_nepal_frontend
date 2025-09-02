import Image from "next/image";
import React from "react";
import whyChooseUsImage from "@/assets/images/home/why-choose-us.jpg";
import userImageOne from "@/assets/images/users/user-one.jpg";
import userImageTwo from "@/assets/images/users/user-two.jpg";
import userImageThree from "@/assets/images/users/user-three.jpg";
import { FaStar } from "react-icons/fa";
import { FaHome, FaShieldAlt, FaMapMarkerAlt, FaHeadset } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="w-full py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="image h-full">
            <div className="h-full lg:pr-16 lg:pb-16 relative">
              <div
                className="absolute h-[90%] w-[90%] bottom-0 right-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, #6b7280 1px, transparent 1px),
                    radial-gradient(circle, #6b7280 1px, transparent 1px),
                    radial-gradient(circle, #6b7280 1px, transparent 1px)
                    `,
                  backgroundSize: "12px 12px, 12px 12px, 12px 12px",
                  backgroundPosition: "6px 6px, right bottom, right top",
                  backgroundRepeat: "repeat, repeat-x, repeat-y",
                }}
              ></div>

              {/* Main image */}
              <Image
                src={whyChooseUsImage}
                alt="SmartRoom Nepal - Best room finding platform"
                layout="responsive"
                width={500}
                height={300}
                className="h-full w-full rounded-2xl relative z-10"
              />

              {/* Card overlay */}
              <div className="absolute bottom-23 left-6 w-[300px] bg-white dark:bg-dropdown z-20 rounded-lg overflow-hidden px-5 py-3 shadow-lg">
                <div className="w-full flex justify-between font-medium text-sm">
                  <span>Happy Tenants</span>
                  <span>Rating</span>
                </div>

                <div className="w-full flex justify-between items-center mt-2">
                  {/* Avatars */}
                  <div className="w-full flex justify-start items-center">
                    <div className="w-10 h-10 rounded-full flex justify-center items-center">
                      <Image
                        src={userImageOne}
                        alt="Happy Tenant 1"
                        height={200}
                        width={200}
                        className="h-full w-full rounded-full"
                      />
                    </div>
                    <div className="w-10 h-10 rounded-full flex justify-center items-center -ml-3">
                      <Image
                        src={userImageTwo}
                        alt="Happy Tenant 2"
                        height={200}
                        width={200}
                        className="h-full w-full rounded-full"
                      />
                    </div>
                    <div className="w-10 h-10 rounded-full flex justify-center items-center -ml-3">
                      <Image
                        src={userImageThree}
                        alt="Happy Tenant 3"
                        height={200}
                        width={200}
                        className="h-full w-full rounded-full"
                      />
                    </div>
                    <div className="w-10 h-10 rounded-full flex justify-center items-center bg-primary text-gray-200 font-semibold text-xs -ml-3">
                      2K+
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="font-bold flex justify-center items-center gap-1">
                    4.8 <FaStar className="text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h1 className="font-bold text-5xl capitalize">
              Find your perfect room in Nepal!
            </h1>
            <p className="my-10 text-normal">
              SmartRoom Nepal is your trusted platform for finding and renting
              quality rooms across Nepal. We connect tenants with verified
              landlords, ensuring safe, affordable, and comfortable living
              spaces tailored to your needs.
            </p>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="w-full">
                <div className="h-14 w-14 flex justify-center items-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full my-2">
                  <FaHome className="text-xl" />
                </div>
                <h4 className="font-bold">Verified Properties</h4>
                <p className="text-normal">
                  All rooms are verified and inspected to ensure quality,
                  safety, and accurate listings for your peace of mind.
                </p>
              </div>

              <div className="w-full">
                <div className="h-14 w-14 flex justify-center items-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full my-2">
                  <FaShieldAlt className="text-xl" />
                </div>
                <h4 className="font-bold">Secure Transactions</h4>
                <p className="text-normal">
                  Safe and secure payment processing with legal documentation
                  support for hassle-free rental agreements.
                </p>
              </div>

              <div className="w-full">
                <div className="h-14 w-14 flex justify-center items-center bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full my-2">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <h4 className="font-bold">Prime Locations</h4>
                <p className="text-normal">
                  Rooms available in prime locations across Kathmandu, Pokhara,
                  and other major cities in Nepal with great connectivity.
                </p>
              </div>

              <div className="w-full">
                <div className="h-14 w-14 flex justify-center items-center bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full my-2">
                  <FaHeadset className="text-xl" />
                </div>
                <h4 className="font-bold">24/7 Support</h4>
                <p className="text-normal">
                  Round-the-clock customer support to assist you with any
                  queries or issues during your room search journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
