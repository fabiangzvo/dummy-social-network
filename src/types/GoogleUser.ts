import { FacebookUser } from "./FacebookUser";

export interface GoogleUserInfo {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
}

export interface UserContextProps {
  user: GoogleUserInfo | FacebookUser | null;
  setUser: (user: GoogleUserInfo | FacebookUser) => void;
}
