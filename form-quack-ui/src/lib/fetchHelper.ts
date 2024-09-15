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

  if (response.status == 401) {
    console.error(await response.json());
    // logout();
    redirect("/logout");
  }

  if (response.status == 500) {
    // TODO: fix this
    // redirect("/logout");
  }

  return response;
};
