"use server";

import { fetchHelper } from "@/lib/fetchHelper";
import { APIResponse } from "@/types";

export const getAllMonthlySubmissions = async () => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/analytics/monthly", {
    next: {
      revalidate: 0,
      tags: ["analytics"],
    },
  });

  const data: APIResponse<KeyVal[]> = await res.json();
  return data;
};

interface KeyVal {
  month_year: string;
  count: number;
}
