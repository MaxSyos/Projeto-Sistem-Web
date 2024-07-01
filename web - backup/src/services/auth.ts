import axios from "axios";
import { api } from "./api";

type SignInRequestData = {
  email: string;
  password: string;
};

export async function signInRequest({
  email,
  password,
}: SignInRequestData): Promise<any> {
  const response = await api.post('users/login', {
    email,
    password,
  });

  const data = await response.data;

  return data;
}

// export async function recoverUserInformation(email: string, password: string) {
//   const { TokenResponse } = await signInRequest({ email, password });
//   return { TokenResponse };
// }
