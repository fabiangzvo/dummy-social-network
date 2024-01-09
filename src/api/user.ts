import { UserFull } from "@/types/User";

import api from "./axiosConfig";

async function getUserById(userId: string): Promise<UserFull> {
  const { data } = await api.get<UserFull>(`/user/${userId}`);

  return data;
}

export { getUserById };
