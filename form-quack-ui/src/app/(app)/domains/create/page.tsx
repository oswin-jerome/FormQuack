"use client";
import { createDomain } from "@/actions/domains";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const CreateDomain = () => {
  const [domain, setDomain] = useState("");

  return (
    <main>
      {" "}
      <form
        onSubmit={async (w) => {
          w.preventDefault();
          const res = await createDomain(domain);
          if (res.ok) {
            return location.replace("/domains");
          }
          alert(res.err);
        }}
      >
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Domain</CardTitle>
            <CardDescription>Add your domain to start receiving form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
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
