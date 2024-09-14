"use client";
import { register } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegistrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    const res = await register(data.name, data.email, data.password);
    if (res.ok) {
      toast.success("Account registered", {
        description: "Welcome to FormQuack. Login to continue",
      });
      router.replace("/login");
    } else {
      toast.error("Oops!!", {
        description: res.err,
      });
    }

    setIsLoading(false);
    // Handle form submission here
    console.log("Form submitted");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details below to create your account</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} id="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
