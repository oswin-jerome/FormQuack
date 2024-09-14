import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const fetchHelper = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: "Bearer " + cookies().get("auth_token")?.value,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status == 500 || response.status == 401) {
    redirect("/logout");
  }

  return response;
};
