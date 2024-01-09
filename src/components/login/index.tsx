"use client";
import { useCallback, useContext } from "react";
import Image from "next/image";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  SimpleGrid,
  Box,
  Heading,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { Passion_One } from "next/font/google";
import { useLogin } from "react-facebook";
import { ImFacebook2 } from "react-icons/im";
import { useFacebook } from "react-facebook";

import { AuthContext } from "@context/AuthContext";
import { UserInfoContext } from "@context/googleUserInfo";
import { FacebookUser } from "@/types/FacebookUser";
import Text from "@components/text";

import styles from "./style.module.css";

const passionOne = Passion_One({
  subsets: ["latin"],
  variable: "--passion-one",
  weight: "400",
});

function Login() {
  const { refreshAuthContext, logout } = useContext(AuthContext);
  const { setUser } = useContext(UserInfoContext);

  const [isMd] = useMediaQuery("(max-width: 1024px)");
  const { init } = useFacebook();
  const toast = useToast();

  const onSuccess = useCallback(
    (response: TokenResponse) => {
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("login", "google");

      refreshAuthContext();
    },
    [refreshAuthContext]
  );

  const onError = useCallback(
    (error: unknown) => {
      console.error(JSON.stringify(error));

      refreshAuthContext();
    },
    [refreshAuthContext]
  );

  const googleLogin = useGoogleLogin({ onSuccess, onError });
  const { login: facebookLogin } = useLogin();

  const onGoogleLogin = useCallback(() => googleLogin(), [googleLogin]);
  const onFacebookLogin = useCallback(async () => {
    try {
      const response = await facebookLogin({ scope: "email" });

      localStorage.setItem("token", response.authResponse.accessToken);
      localStorage.setItem("login", "facebook");

      const api = await init();
      if (!api) {
        toast({
          title: "sign in failed",
          description:
            "could not connect with facebook, please try again later",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        logout();

        return;
      }

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
      console.log(profile);
      profile && setUser(profile as FacebookUser);

      refreshAuthContext();
    } catch (e) {
      console.log(e);
      toast({
        title: "sign in failed",
        description: "could not connect with facebook, please try again later",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      logout();
    }
  }, [facebookLogin, refreshAuthContext, init, setUser, toast, logout]);

  return (
    <SimpleGrid
      as="main"
      className={styles.container}
      columns={isMd ? 1 : 2}
      spacing={2}
    >
      <Box className={styles.cardContent}>
        <Image src="/home.png" alt="image" height={1276} width={1206} />
      </Box>
      <Box className={isMd ? styles.contentMd : styles.content}>
        <div>
          <Heading id={styles.title} style={passionOne.style} size="4xl">
            The new social network!
          </Heading>
          <Text id={styles.description} fontSize="2xl">
            Our app is designed to connect you in an authentic way. Discover a
            unique experience beyond the conventional.
          </Text>
        </div>
        <div className={styles.buttons}>
          <Text fontSize="2xl">Sign in with:</Text>
          <Button
            rightIcon={<FcGoogle size="1.5em" />}
            onClick={onGoogleLogin}
            aria-label="sign in with google"
            variant="outline"
            className={styles.loginButton}
            rounded="full"
          >
            <Text fontSize="xl">Google</Text>
          </Button>
          <Button
            rightIcon={<ImFacebook2 color="blue" size="1.5em" />}
            onClick={onFacebookLogin}
            aria-label="sign in with facebook"
            variant="outline"
            className={styles.loginButton}
            rounded="full"
          >
            <Text fontSize="xl">Facebook</Text>
          </Button>
        </div>
      </Box>
    </SimpleGrid>
  );
}

export default Login;