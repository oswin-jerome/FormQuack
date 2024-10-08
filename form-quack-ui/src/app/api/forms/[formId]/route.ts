import { redirect } from "next/navigation";

export async function POST(request: Request, { params }: { params: { formId: string } }) {
  const host = request.headers.get("origin")?.replace("http://", "").replace("https://", "");
  console.log(host);
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

  const a = await res.json();
  if (!a.ok) {
    console.log(a);
    redirect(`/error?message=${a.err}&back=${request.headers.get("referer")}`);
  }

  redirect(`/success?domain=${a.data.domain}&back=${request.headers.get("referer")}&message=${a.data.message ?? ""}`);
}
