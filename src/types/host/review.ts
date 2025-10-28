import { Media } from "../common/media";

export type Review = {
  id: number;
  rating: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  roomRequest: {
    id: number;
    token: string;
    status: string;
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
      price: number;
      unit: string;
      offerPrice: number | null;
    };
  };
};
