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
  isWishlisted: boolean;
  district: {
    id: number;
    name: string;
    slug: string;
  };
  amenities: {
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
  isWishlisted: boolean;
  isAvailable: boolean;
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

// in room details page show reviews
export type Review = {
  id: number;
  rating: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  media: Media | null;
  roomRequest: {
    id: number; // dont show in client
    token: string; // dont show in client
    status: string; // dont show in client
    user: {
      id: number;
      username: string;
      fullName: string;
      userProfile: {
        id: number;
        avatar: Media | null;
      };
    };
    room: {
      id: number;
      name: string;
      slug: string;
    };
  };
};
