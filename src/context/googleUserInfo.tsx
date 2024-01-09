"use client";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { useFacebook } from "react-facebook";
import { useToast } from "@chakra-ui/react";

import { GoogleUserInfo, UserContextProps } from "@/types/GoogleUser";
import { FacebookUser } from "@/types/FacebookUser";
import { getUserProfile } from "@api/userGoogle";

import { AuthContext } from "./AuthContext";

interface UserInfoProviderProps {
  children: ReactNode;
}

export const UserInfoContext = createContext<UserContextProps>({
  user: null,
  setUser: () => null,
});

export const UserInfoProvider = (props: UserInfoProviderProps) => {
  const { children } = props;

  const [user, setUser] = useState<GoogleUserInfo | FacebookUser | null>(null);
  const { isAuthenticated, refreshAuthContext, logout } =
    useContext(AuthContext);

  const { init } = useFacebook();
  const toast = useToast();

  useEffect(() => {
    async function getUserInfo() {
      const loginType = window.localStorage.getItem("login") || "";
      const token = window.localStorage.getItem("token") || "";

      if (!token || !loginType) {
        refreshAuthContext();

        return;
      }

      if (loginType === "google") {
        const userInfo = await getUserProfile({
          accessToken: token,
        });

        setUser(userInfo);
      } else if (loginType === "facebook") {
        try {
          const api = await init();
          if (!api) {
            toast({
              title: "session status",
              description:
                "could not connect with facebook, please try again later",
              status: "error",
              duration: 9000,
              isClosable: true,
            });

            logout();

            return;
          }

          if (api) {
            const profile = await api.getProfile({
              fields: [
                "id",
                "first_name",
                "last_name",
                "middle_name",
                "name",
                "name_format",
                "picture",
                "short_name",
                "email",
              ],
            });

            profile && setUser(profile as FacebookUser);
          }
        } catch (e) {
          toast({
            title: "session status",
            description:
              "could not connect with facebook, please try again later",
            status: "error",
            duration: 9000,
            isClosable: true,
          });

          logout();
        }
      }
    }

    isAuthenticated && getUserInfo();
  }, [init, isAuthenticated, refreshAuthContext, toast, logout]);

  const setNewUser = useCallback(
    (user: GoogleUserInfo | FacebookUser) => setUser(user),
    []
  );

  return (
    <UserInfoContext.Provider value={{ user, setUser: setNewUser }}>
      {children}
    </UserInfoContext.Provider>
  );
};
