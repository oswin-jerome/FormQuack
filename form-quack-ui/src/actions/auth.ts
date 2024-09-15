"use server";

import { fetchHelper } from "@/lib/fetchHelper";
import { APIResponse, User } from "@/types";
import { cookies } from "next/headers";

export const login = async (email: string, password: string) => {
  const res = await fetch(process.env.API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (res.status != 200) {
    return {
      done: false,
    };
  }

  const token = await res.text();
  cookies().set("auth_token", token);

  return {
    done: true,
  };
};

export const register = async (name: string, email: string, password: string) => {
  const res = await fetch(process.env.API_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });

  const data: APIResponse<Object> = await res.json();
  return data;
};

export const getUser = async () => {
  const res = await fetchHelper(process.env.API_URL + "/auth/user", {
    next: {
      revalidate: 0,
      tags: ["get_domain"],
    },
  });

  const data: APIResponse<User> = await res.json();
  return data;
};

export const changePassword = async (password: string) => {
  const res = await fetchHelper(process.env.API_URL + "/auth/user/change_password", {
    method: "PATCH",
    body: JSON.stringify({ password }),
    next: {
      revalidate: 0,
      tags: ["get_domain"],
    },
  });

  const data: APIResponse<User> = await res.json();
  return data;
};

export const resetPassword = async (email: string) => {
  const res = await fetch(process.env.API_URL + "/auth/user/reset_password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    next: {
      revalidate: 0,
      tags: ["get_domain"],
    },
  });

  const data: APIResponse<Object> = await res.json();

  return data;
};

export const changePlan = async (plan: string) => {
  const res = await fetchHelper(process.env.API_URL + "/auth/user/plan", {
    method: "PATCH",
    body: JSON.stringify({
      plan,
    }),
    next: {
      revalidate: 0,
      tags: ["get_domain"],
    },
  });

  const data: APIResponse<User> = await res.json();
  return data;
};

export const logout = async () => {
  "use server";
  cookies().delete("auth_token");
};
