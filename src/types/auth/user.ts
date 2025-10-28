import { Media } from "@/types/common/media";

export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  isEmailVerified: boolean;
  isEnabled: boolean;
  loginMethod: string;
  role: string;
  userProfile: {
    id: number;
    phone: string | null;
    gender: string | null;
    dob: string | null;
    occupationStatus: string | null;
    maritalStatus: string | null;
    avatar: Media | null;
    document: Media | null;
  };
};
