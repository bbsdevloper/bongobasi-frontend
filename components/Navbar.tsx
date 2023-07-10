import { useUser } from "@/context/userContext";

import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "../app/lib/chakraui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Logout } from "@/functions/auth/logout";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter();
  
  return (
    <div className="h-20 px-8 py-4 flex justify-between items-center text-blueDeep font-semibold bg-white shadow-lg">
      <Link href="/">
        <img src="/english.png" className="w-36" />
      </Link>
      <li className="flex justify-end items-center space-x-8">
        <ul className="cursor-pointer hover:scale-105 transition-all duration-150">
          <a href="/">Home</a>
        </ul>
        <ul className="cursor-pointer hover:scale-105 transition-all duration-150">
          <a href={"/issues"}>All Issues</a>
        </ul>
        <ul
          className="cursor-pointer hover:scale-105 transition-all duration-150"
        >
          <a href="/report-issue">Report issue</a>
        </ul>
        <ul className="cursor-pointer hover:scale-105 transition-all duration-150">
          Help
        </ul>
        {user?.UserId ? (
          <Menu>
            <MenuButton>
              <Avatar
                name={user.username}
                size={"sm"}
                cursor={"pointer"}
                onClick={() => setOpen(true)}
              />
            </MenuButton>
            <MenuList fontWeight={"400"}>
              <MenuItem
                onClick={() =>
                  router.push("/profile?currentTab=personalDetails")
                }
              >
                Profile
              </MenuItem>
              <MenuItem onClick={() => Logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <button
            className="btn-primary"
            onClick={() => router.push("/auth/login")}
          >
            Register/Login
          </button>
        )}
      </li>
    </div>
  );
};

export default Navbar;
