import { ReactNode } from "react";

import { Location } from "./Location";

export interface UserPreview {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface UserFull extends UserPreview {
  gender: "male" | "female" | "other" | "";
  email: string;
  dateOfBirth: Date;
  registerDate: string;
  phone: string;
  location: Location;
}

export interface UserInfoItem {
  key: string;
  label: string;
  icon?: ReactNode;
  type?: "text" | "date";
  color?: string;
}

export type UserDataList = Array<UserInfoItem>;
