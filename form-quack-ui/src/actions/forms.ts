"use server";

import { fetchHelper } from "@/lib/fetchHelper";
import { APIResponse, FormOverview, Submission } from "@/types";

export const getSubmissions = async (formId: string) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/submissions/" + formId, {
    next: {
      revalidate: 0,
      tags: ["get_subs"],
    },
  });

  const data: APIResponse<Submission[]> = await res.json();
  return data;
};

export const getForm = async (formId: number) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/forms/" + formId, {
    next: {
      revalidate: 0,
      tags: ["get_domain"],
    },
  });

  const data: APIResponse<FormOverview> = await res.json();
  return data;
};

export const setEmailForwarding = async (formId: string, forwardToEmail: boolean) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/forms/" + formId, {
    method: "PATCH",
    body: JSON.stringify({
      forwardToEmail,
    }),
    next: {
      revalidate: 0,
      tags: ["get_domain"],
    },
  });
  const data: APIResponse<FormOverview> = await res.json();
  return data;
};

export const manageAckStatus = async (formId: string, sendAck: boolean) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/forms/" + formId, {
    method: "PATCH",
    body: JSON.stringify({
      sendAck,
    }),
    next: {
      revalidate: 0,
      tags: ["get_domain"],
    },
  });
  const data: APIResponse<FormOverview> = await res.json();
  return data;
};
export const manageAckMessage = async (formId: string, ackMessage: string) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/forms/" + formId, {
    method: "PATCH",
    body: JSON.stringify({
      ackMessage,
    }),
    next: {
      revalidate: 0,
      tags: ["get_domain"],
    },
  });
  const data: APIResponse<FormOverview> = await res.json();
  return data;
};

export const updateCustomMessage = async (formId: string, successMessage: string) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/forms/" + formId, {
    method: "PATCH",
    body: JSON.stringify({
      successMessage,
    }),
    next: {
      revalidate: 0,
      tags: ["get_domain"],
    },
  });
  const data: APIResponse<FormOverview> = await res.json();
  return data;
};

export const updateEmail = async (formId: string, emailID: number, add: boolean) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/forms/" + formId + "/email", {
    method: "PATCH",
    body: JSON.stringify({
      id: emailID,
      toAdd: add,
    }),
    next: {
      revalidate: 0,
      tags: ["update_email"],
    },
  });

  const data: APIResponse<FormOverview> = await res.json();
  return data;
};
