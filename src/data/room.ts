import { Room } from "@/types/room/room";
import roomImageOne from "@/assets/images/rooms/1.jpg";
import roomImageTwo from "@/assets/images/rooms/2.jpg";
import roomImageThree from "@/assets/images/rooms/3.jpg";
import roomImageFour from "@/assets/images/rooms/4.jpg";

import {
  FaSnowflake,
  FaWifi,
  FaUtensils,
  FaBath,
  FaTv,
  FaCar,
} from "react-icons/fa";

export const RoomData: Room[] = [
  {
    id: 1,
    title: "Cozy 1BHK Apartment",
    location: "Baneshwor, Kathmandu",
    image: roomImageOne.src,
    price: 12000,
    per: "month",
    featured: true,
    shortDescription:
      "A cozy 1BHK apartment located in the heart of Baneshwor, Kathmandu. Perfect for singles or couples looking for a comfortable living space.",
    rating: 4.7,
    amenities: [
      { icon: FaWifi, label: "WiFi" },
      { icon: FaSnowflake, label: "Air Conditioning" },
      { icon: FaUtensils, label: "Kitchen" },
    ],
  },
  {
    id: 2,
    title: "Shared Room for Students",
    location: "Kirtipur, Kathmandu",
    image: roomImageTwo.src,
    price: 4500,
    per: "month",
    shortDescription:
      "A budget-friendly shared room ideal for students, located in the vibrant area of Kirtipur, Kathmandu.",
    featured: false,
    rating: 4.3,
    amenities: [
      { icon: FaWifi, label: "WiFi" },
      { icon: FaBath, label: "Attached Bathroom" },
    ],
  },
  {
    id: 3,
    title: "2BHK Family Flat",
    location: "Pokhara Lakeside",
    image: roomImageThree.src,
    price: 18000,
    per: "month",
    shortDescription:
      "A spacious 2BHK family flat located in the serene Pokhara Lakeside area, perfect for families seeking comfort and tranquility.",
    featured: true,
    rating: 4.8,
    amenities: [
      { icon: FaWifi, label: "WiFi" },
      { icon: FaTv, label: "TV" },
      { icon: FaCar, label: "Parking" },
    ],
  },
  {
    id: 4,
    title: "Affordable Single Room",
    location: "Bhaktapur Durbar Square",
    image: roomImageFour.src,
    price: 60000,
    per: "year",
    shortDescription:
      "An affordable single room located near Bhaktapur Durbar Square, ideal for budget-conscious individuals.",
    featured: false,
    rating: 4.1,
    amenities: [
      { icon: FaWifi, label: "WiFi" },
      { icon: FaBath, label: "Shared Bathroom" },
    ],
  },
  {
    id: 5,
    title: "Luxury Studio Apartment",
    location: "Lazimpat, Kathmandu",
    image: roomImageOne.src,
    price: 25000,
    per: "month",
    shortDescription:
      "A luxurious studio apartment located in the upscale Lazimpat area of Kathmandu, offering modern amenities and a stylish living space.",
    featured: true,
    rating: 4.9,
    amenities: [
      { icon: FaSnowflake, label: "Air Conditioning" },
      { icon: FaTv, label: "Smart TV" },
      { icon: FaCar, label: "Parking" },
      { icon: FaUtensils, label: "Kitchen" },
    ],
  },
  {
    id: 6,
    title: "Budget Hostel Room",
    location: "Pulchowk, Lalitpur",
    image: roomImageTwo.src,
    price: 35000,
    per: "year",
    shortDescription:
      "A budget-friendly hostel room located in the lively area of Pulchowk, Lalitpur, perfect for students and young professionals.",
    featured: false,
    rating: 3.9,
    amenities: [
      { icon: FaWifi, label: "WiFi" },
      { icon: FaBath, label: "Shared Bathroom" },
    ],
  },
];
