import googleAxios from "./gooleConfig";

import { GoogleUserInfo } from "@/types/GoogleUser";

async function getUserProfile({
  accessToken,
}: {
  accessToken: string;
}): Promise<GoogleUserInfo> {
  const { data } = await googleAxios.get<GoogleUserInfo>("/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

export { getUserProfile };
