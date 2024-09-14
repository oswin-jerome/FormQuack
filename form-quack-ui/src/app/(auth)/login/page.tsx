"use client";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold dark:text-primary-foreground">Login</h1>
            <p className="text-balance dark:text-muted-foreground">Enter your email below to login to your account</p>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              const res = await login(data.email, data.password);
              if (res.done) {
                toast.success("Welcome!!!", {
                  description: "You are logged in!",
                });
                router.replace("/dashboard");
              } else {
                toast.error("Oops", {
                  description: "Unable to login, Check your credentials",
                });
              }
              setIsLoading(false);
            }}
            className="grid gap-4 dark:text-primary-foreground"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} id="email" className="bg-white text-primary" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} id="password" className="bg-white text-primary" type="password" required />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image src="/placeholder.svg" alt="Image" width="1920" height="1080" className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
};

export default LoginPage;
