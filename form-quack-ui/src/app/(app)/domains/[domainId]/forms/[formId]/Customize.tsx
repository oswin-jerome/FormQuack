"use client";

import { updateCustomMessage } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const Customize = ({ form }: { form: Form }) => {
  const [message, setMessage] = useState(form.successMessage);
  const [primaryColor, setPrimaryColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#4CAF50");
  const [loading, setLoading] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize redirect page</CardTitle>
        <CardDescription>Customize your redirect pages to match your style</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter success message" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="textColor">Primary Color</Label>
          <div className="flex items-center space-x-2">
            <Input id="textColor" type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-12 h-12 p-1 rounded-md" />
            <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} placeholder="#ffffff" className="flex-grow" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-4">
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            const res = await updateCustomMessage(form.id, message);
            if (res.ok) {
              toast.success("Updated!!", {
                description: "Custom message updated",
              });
            } else {
              toast.error("Oops!!", {
                description: res.err,
              });
            }
            setLoading(false);
          }}
        >
          Save
        </Button>
        <Link target="__blank" href={`/success?message=${message}&color=${primaryColor}`}>
          <Button variant={"outline"}>Preview</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Customize;
