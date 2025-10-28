import { Media } from "../common/media";

// For host
export type UpdateRoomRequestForm = {
  //   the status can be RoomRequestStatus.APPROVED | RoomRequestStatus.REJECTED
  status: string; // @/enums/roomRequestStatus.ts

  // if status is approved then acceptedPrice is required
  acceptedPrice?: number;
};

export type RoomRequest = {
  id: number;
  token: string;
  isFixedDate: boolean;
  startDate: string | null;
  endDate: string | null;
  price: number;
  acceptedPrice: number;
  status: string; // @/enums/roomRequestStatus.ts
  createdAt: string;
  updatedAt: string;
  // this is user details
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    userProfile: {
      id: number;
      phone: string | null;
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
