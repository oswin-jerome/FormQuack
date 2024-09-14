import { redirect } from "next/navigation";

export async function POST(request: Request, { params }: { params: { formId: string } }) {
  const host = request.headers.get("host");

  const payload = await request.formData();
  var toSend: any = {
    host,
  };
  payload.forEach((val, key) => {
    toSend[key] = val;
  });

  const res = await fetch(process.env.API_URL + "/public/forms/" + params.formId, {
    method: "POST",
    body: JSON.stringify(toSend),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    redirect(`/error?message=Something went wrong`);
  }

  const a = await res.json();

  redirect(`/success?domain=${a.data.id}&back=${request.headers.get("referer")}`);
}
