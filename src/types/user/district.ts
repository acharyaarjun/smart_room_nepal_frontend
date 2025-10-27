import { Media } from "../common/media";

export type District = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  image: Media | null;
};
