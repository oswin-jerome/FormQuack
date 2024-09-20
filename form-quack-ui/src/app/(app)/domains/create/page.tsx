"use client";
import { createDomain } from "@/actions/domains";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const CreateDomain = () => {
  const [domain, setDomain] = useState("");

  return (
    <main>
      <form
        onSubmit={async (w) => {
          w.preventDefault();
          const res = await createDomain(domain);
          if (res.ok) {
            return location.replace("/domains");
          } else {
            console.log(res);
            toast.error("Oops", {
              description: res.err,
            });
          }
        }}
      >
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Domain</CardTitle>
            <CardDescription>Add your domain to start receiving form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Domain</Label>
              <Input placeholder="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
              <small className="opacity-50 text-xs">Enter your domain without http:// or https://</small>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
};

export default CreateDomain;
