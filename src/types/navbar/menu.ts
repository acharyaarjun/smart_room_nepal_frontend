import { IconType } from "react-icons";

export type Menu = {
  id: number;
  title: string;
  link: string | null;
};

export type SidebarMenu = {
  id: number;
  title: string;
  link: string;
  icon: IconType;
};
