import { District } from "@/types/room/district";
import baglungImage from "@/assets/images/districts/baglung.jpg";
import pokharaImage from "@/assets/images/districts/pokhara.jpg";
import kathmanduImage from "@/assets/images/districts/kathmandu.jpg";
import butwualImage from "@/assets/images/districts/butwal.jpg";
import dharanImage from "@/assets/images/districts/dharan.jpg";
import biratnagarImage from "@/assets/images/districts/biratnagar.png";

export const DistrictData: District[] = [
  {
    id: 1,
    name: "Baglung",
    image: baglungImage.src,
    description: "Gateway to Himalayas",
  },
  {
    id: 2,
    name: "Pokhara",
    image: pokharaImage.src,
    description: "City of Lakes",
  },
  {
    id: 3,
    name: "Kathmandu",
    image: kathmanduImage.src,
    description: "Capital City",
  },
  {
    id: 4,
    name: "Butwal",
    image: butwualImage.src,
    description: "Trade Hub",
  },
  {
    id: 5,
    name: "Dharan",
    image: dharanImage.src,
    description: "City of Diversity",
  },
  {
    id: 6,
    name: "Biratnagar",
    image: biratnagarImage.src,
    description: "Industrial City",
  },
];
