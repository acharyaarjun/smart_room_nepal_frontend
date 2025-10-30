"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function RoomsNearMe() {
  const router = useRouter();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleFindRoomsNearMe = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const radius = 10; // 10km default

          setIsGettingLocation(false);
          toast.success("Location detected! Redirecting...");

          // Store in sessionStorage for the rooms page to use
          sessionStorage.setItem(
            "nearbyLocation",
            JSON.stringify({ latitude, longitude, radius })
          );

          // Redirect to rooms page
          router.push("/rooms");
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsGettingLocation(false);
          toast.error(
            "Unable to get your location. Please enable location services and try again."
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="relative inline-block">
                <FaMapMarkerAlt className="text-6xl text-primary animate-bounce" />
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full animate-ping"></span>
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full"></span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Find Your Perfect Room{" "}
              <span className="text-primary">Nearby</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Discover amazing rooms within 10 kilometers of your current
              location. One click and you&apos;re on your way!
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="text-center"
          >
            <button
              onClick={handleFindRoomsNearMe}
              disabled={isGettingLocation}
              className="group relative inline-flex items-center justify-center gap-4 px-8 md:px-12 py-5 md:py-6 bg-gradient-to-r from-primary via-primary-dark to-primary hover:from-primary-dark hover:via-primary hover:to-primary-dark text-white text-lg md:text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
            >
              {/* Animated Background Shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Icon */}
              <div className="relative z-10">
                <FaMapMarkerAlt className="text-3xl md:text-4xl group-hover:animate-bounce" />
              </div>

              {/* Text */}
              <div className="relative z-10 flex flex-col items-start">
                <span className="text-xl md:text-2xl">
                  {isGettingLocation
                    ? "📍 Detecting Location..."
                    : "🎯 Find Rooms Near Me"}
                </span>
                <span className="text-sm md:text-base text-white/90 font-normal">
                  {isGettingLocation
                    ? "Please wait..."
                    : "Click to explore rooms within 10km"}
                </span>
              </div>

              {/* Arrow */}
              <div className="relative z-10">
                <FaArrowRight className="text-2xl md:text-3xl group-hover:translate-x-2 transition-transform duration-300" />
              </div>

              {/* Pulse Effect */}
              <span className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                emoji: "⚡",
                title: "Instant Results",
                description: "Get rooms near you in seconds",
              },
              {
                emoji: "📍",
                title: "10km Radius",
                description: "Perfect distance for daily commute",
              },
              {
                emoji: "🎯",
                title: "Accurate Location",
                description: "GPS-powered precision search",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white dark:bg-dropdown rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Info Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              🔒 Your location data is secure and only used for this search
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
