import { Media } from "../common/media";

// room request is done by user from userdetails page
export type RoomRequestForm = {
  isFixedDate?: boolean; // only required if room unit is day
  startDate?: string; // only required if isFixedDate is true
  endDate?: string; // only required if isFixedDate is true
  message: string;
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
  hasReview?: boolean;
  room: {
    id: number;
    name: string;
    slug: string;
    price: number;
    unit: string;
    offerPrice: number | null;
    address: string;
    roomType: string; // @/enums/roomType.ts
    maxCapacity: string; // @/enums/maxCapacity.ts
    // this is host details
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
  };
};
