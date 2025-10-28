import { Media } from "../common/media";

// from dashboard booking
export type ReviewForm = {
  rating: number; // 1 to 5
  message: string;
};

// in dashboard show reviews
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
    room: {
      id: number;
      name: string;
      slug: string;
      price: number;
      unit: string;
      offerPrice: number | null;
      user: {
        id: number;
        username: string;
        fullName: string;
        userProfile: {
          id: number;
          avatar: Media | null;
        };
      };
    };
  };
};
