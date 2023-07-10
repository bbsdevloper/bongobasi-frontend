"use client";

import { IUser } from "@/Interface/UserInterface";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import React, { useContext } from "react";
import { checkUser } from "@/functions/user/checkUser";
import { useRouter } from "next/navigation";
import { decodeJWT } from "@/functions/decodeJwt";
import { CircularProgress } from "@chakra-ui/react";

interface IDefaultValues {
  user: null | IUser;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  getUserData: () => any;
}

const defaultValues: IDefaultValues = {
  user: null,
  setUser: () => {},
  getUserData: () => {},
};

const userContext = React.createContext(defaultValues);

export function useUser() {
  return useContext(userContext);
}

export function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(defaultValues.user);
  const [jwtToken, setJwtToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const _jwtToken = window.sessionStorage.getItem("jwtToken") as string;
    setJwtToken(_jwtToken);
  }, []);

  const getUserData = useCallback(async () => {
    setLoading(false);
    let mobileNumber = jwtToken && (decodeJWT(jwtToken) as string);
    if (jwtToken !== "") {
      const data = await checkUser(mobileNumber as string);
      setUser({ ...data, UserId: data._id });
    }
    setLoading(false);
  }, [jwtToken]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center space-y-4">
          <CircularProgress isIndeterminate color="blue.400" />
          <h1>Loading please wait!</h1>
        </div>
      ) : (
        <userContext.Provider value={{ user, setUser, getUserData }}>
          {children}
        </userContext.Provider>
      )}
    </>
  );
}
