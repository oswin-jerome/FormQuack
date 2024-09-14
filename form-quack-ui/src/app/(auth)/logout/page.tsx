"use client";

import { logout } from "@/actions/auth";
import { useEffect } from "react";

const LogoutPage = async () => {
  useEffect(() => {
    logout();
    location.replace("/login");
  }, []);
  //   redirect("/login");
  return <div></div>;
};

export default LogoutPage;
