"use client";
import React from "react";
import welcomeBackBackgroundImage from "@/assets/images/others/breadcrumb.jpg";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleActiveBooking } from "@/redux/features/common/appSlice";

export default function WelcomeBack() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="w-full relative rounded-2xl overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-[rgba(30,58,138,0.8)] to-transparent z-[1]"></div>

      <div className="absolute top-0 left-0 h-full w-full z-0">
        <Image
          src={welcomeBackBackgroundImage}
          alt="Welcome Back"
          className="w-full h-full object-cover"
          width={720}
          height={480}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-6 sm:p-20">
        <h1 className="text-4xl font-bold text-white">
          Welcome back, {user?.fullName.split(" ")[0]}! 👋
        </h1>
        <p className="text-white my-2 text-lg">Your journey begins here 🌄</p>
        <div className="w-full mt-6">
          <div className="flex gap-4 items-start justify-start flex-wrap">
            <Link
              href={""}
              className="bg-tertiary text-white px-6 py-2.5 rounded-2xl font-medium max-w-[300px]"
            >
              Book Your First Trek
            </Link>

            <button
              onClick={() => dispatch(toggleActiveBooking())}
              title="Toogle Active Booking"
              className="bg-[#516f8d] text-white px-6 py-2.5 rounded-2xl font-medium cursor-pointer"
            >
              Toogle Active Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
