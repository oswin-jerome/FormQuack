"use server";

import { fetchHelper } from "@/lib/fetchHelper";
import { APIResponse, Form } from "@/types";

export const getAllDomains = async () => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/domains", {
    next: {
      revalidate: 0,
    },
  });

  const data = await res.json();

  return data.data;
};

export const createDomain = async (domain: string) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/domains", {
    method: "POST",
    body: JSON.stringify({
      domain: domain,
    }),
  });

  const data = await res.json();
  return data;
};

export const getDomain = async (domainId: number) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/domains/" + domainId, {
    next: {
      revalidate: 0,
      tags: ["get_domain"],
    },
  });

  const data = await res.json();
  return data;
};

export const createForm = async (domainId: number, name: string) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/forms/" + domainId, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      active: true,
    }),
    next: {
      tags: ["create_form"],
    },
  });

  const data: APIResponse<Form> = await res.json();
  return data;
};

export const testDomain = () => {
  console.log("######## TEST ########");
};
