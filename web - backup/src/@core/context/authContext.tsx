import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { signInRequest } from "src/services/auth";
import { api } from "src/services/api";
import { setToStorage } from "src/utils/storage.helper";
import { AUTH } from "src/enums/auth.enums";

type User = {
  name: string;
  email: string;
  avatar_url?: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<any>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      setUser(user);
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { TokenResponse } = await signInRequest({
      email,
      password,
    });

    const user = TokenResponse.user;
    const token = TokenResponse.token;
    setToStorage(AUTH.TOKEN, token);

    setCookie(token, "nextauth.token", token, {
      maxAge: 7200, // 1 hour 60*60*1
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
