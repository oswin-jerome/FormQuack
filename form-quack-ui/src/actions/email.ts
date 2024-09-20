"use server";

import { fetchHelper } from "@/lib/fetchHelper";
import { APIResponse, Email } from "@/types";

export const addEmail = async (email: string) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/emails", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  const data: APIResponse<Object> = await res.json();
  return data;
};
export const deleteEmail = async (emailId: number) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/emails/" + emailId, {
    method: "DELETE",
  });

  const data: APIResponse<Object> = await res.json();

  return data;
};

export const getAllEmails = async () => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/emails", {
    method: "GET",
  });

  const data: APIResponse<Email[]> = await res.json();

  return data;
};
