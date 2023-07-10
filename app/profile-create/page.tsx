"use client";
import Navbar from "@/components/Navbar";
import { Input, Select } from "../lib/chakraui";
import React, { useEffect, useState } from "react";
import { IUser } from "@/Interface/UserInterface";
import { decodeJWT } from "@/functions/decodeJwt";
import { createUser } from "@/functions/user/createUser";
import { useRouter } from "next/navigation";

const CreateProfile = () => {
  const [userData, setUserData] = useState<IUser>({
    UserId: "",
    username: "",
    useremail: "",
    gender: "",
    userphone: "",
    UserProfilePhoto: "",
    userlocation: "",
    userage: NaN,
    UserVerified: false,
    UserIdProof: "",
  });
  const [jwToken, setJWToken] = useState<string>("");
  useEffect(() => {
    if (window !== undefined) {
      const _jwtToken = window.sessionStorage.getItem("jwtToken") as string;
      setJWToken(_jwtToken);
    }
  }, [jwToken]);
  const router = useRouter();
  const validateForm = () => {
    if (
      userData.username === "" ||
      userData.useremail === "" ||
      userData.gender === "" ||
      userData.userphone === "" ||
      userData.UserProfilePhoto === "" ||
      userData.userlocation === "" ||
      Number.isNaN(userData.userage)
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleCreateUser = async () => {
    const phnNumber = decodeJWT(jwToken);
    console.log(phnNumber);
    const data = {
      username: userData.username,
      useremail: userData.useremail,
      gender: userData.gender,
      userphone: phnNumber?.toString(),
      UserProfilePhoto: userData.UserProfilePhoto,
      userlocation: userData.userlocation,
      userage: userData.userage,
      UserVerified: false,
      UserIdProof: "",
    };

    await createUser(data);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-blueBackground">
      <Navbar />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="bg-white  max-w-[70vw] min-w-[50vw] shadow-xl p-6 rounded-2xl text-md justify-items-stretch space-y-4">
          <h1 className="text-1.5xl">Add your personal details</h1>
          <section>
            <h2 className="font-medium mb-2">Name</h2>
            <Input
              type="text"
              backgroundColor={"#FBFAFF"}
              focusBorderColor="#1A75FF"
              placeholder="Enter your Name"
              size={"md"}
              value={userData.username}
              onChange={(e) =>
                setUserData((prev: any) => {
                  return {
                    ...prev,
                    username: e.target.value,
                  };
                })
              }
              fontSize="base"
            />
          </section>
          <section>
            <h2 className="font-medium mb-2">Email</h2>
            <Input
              type="email"
              backgroundColor={"#FBFAFF"}
              focusBorderColor="#1A75FF"
              placeholder="Enter your Email id"
              size={"md"}
              fontSize="base"
              value={userData.useremail}
              onChange={(e) =>
                setUserData((prev: any) => {
                  return {
                    ...prev,
                    useremail: e.target.value,
                  };
                })
              }
            />
          </section>
          <section>
            <h2 className="font-medium mb-2">Gender</h2>
            <Select
              backgroundColor={"#FBFAFF"}
              placeholder="--select--"
              focusBorderColor="#1A75FF"
              size={"md"}
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev: any) => {
                  return {
                    ...prev,
                    gender: e.target.value,
                  };
                })
              }
              fontSize="base"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Trans</option>
            </Select>
          </section>
          <section>
            <h2 className="font-medium mb-2">Age</h2>
            <Input
              type="number"
              backgroundColor={"#FBFAFF"}
              focusBorderColor="#1A75FF"
              placeholder="Enter Age"
              size={"md"}
              value={userData.userage}
              onChange={(e) =>
                setUserData((prev: any) => {
                  return {
                    ...prev,
                    userage: e.target.value,
                  };
                })
              }
              fontSize="base"
            />
          </section>
          <section>
            <h2 className="font-medium mb-2">City/Town/Village</h2>
            <Input
              type="text"
              backgroundColor={"#FBFAFF"}
              focusBorderColor="#1A75FF"
              placeholder="Enter City/Town/Village"
              size={"md"}
              value={userData.userlocation}
              onChange={(e) =>
                setUserData((prev: any) => {
                  return {
                    ...prev,
                    userlocation: e.target.value,
                  };
                })
              }
              fontSize="base"
            />
          </section>
          <button
            className="btn-primary w-full rounded-md"
            disabled={validateForm()}
            onClick={handleCreateUser}
          >
            Submit & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
