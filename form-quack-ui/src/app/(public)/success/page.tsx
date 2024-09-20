"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
const Success = () => {
  const query = useSearchParams();

  const message = query.has("message") && query.get("message") != "" ? query.get("message") : "Form submitted successfully. Thank you for using our service.";
  const color = query.get("bg-red-400") ?? "Form submitted successfully. Thank you for using our service.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-12 h-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-800">Success!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href={query.get("back") ?? ""} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
            Go Back
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Success;
