import { Media } from "../common/media";

export type Room = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  price: number;
  unit: string;
  offerPrice: number | null;
  address: string;
  roomType: string; // @/enums/roomType.ts
  maxCapacity: string; // @/enums/maxCapacity.ts
  createdAt: string;
  updatedAt: string;
  image: Media | null;
  district: {
    id: number;
    name: string;
    slug: string;
  };
  aamenities: {
    id: number;
    name: string;
    icon: string;
  }[];
};

export type RoomDetails = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  unit: string;
  offerPrice: number | null;
  address: string;
  roomType: string; // @/enums/roomType.ts
  maxCapacity: string; // @/enums/maxCapacity.ts
  longitude: number;
  latitude: number;
  createdAt: string;
  updatedAt: string;
  district: {
    id: number;
    name: string;
    slug: string;
    description: string;
  };
  image: Media | null;
  roomMedias: {
    id: number;
    media: Media | null;
  }[];
  roomAmenities: {
    id: number;
    description: string | null;
    amenity: {
      id: number;
      name: string;
      icon: string;
      description: string | null;
    };
  }[];
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    createdAt: string;
    userProfile: {
      id: number;
      phone: string | null;
      status: string; // active, pending, suspended
      avatar: Media | null;
    };
  };
};
