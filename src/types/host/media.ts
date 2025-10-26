import { Media } from "../common/media";

export type RoomMedia = {
  id: number;
  updatedAt: string;
  createdAt: string;
  media: Media;
};

export type RoomMediaForm = {
  medias: File[];
};
