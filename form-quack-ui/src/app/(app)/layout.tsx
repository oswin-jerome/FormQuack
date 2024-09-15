"use client";
import { getUser, logout } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User } from "@/types";
import { Globe, Home, LineChart, LogOut, Package2, PanelLeft, Search, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const r = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    getUser().then((res) => {
      setUser(res?.data);
    });
  }, []);

  const menus = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/domains",
      label: "Domains",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: <LineChart className="h-5 w-5" />,
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link href="#" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full  text-xl font-semibold text-primary-foreground md:h-8 md:w-8 md:text-xl">
              {/* <Package2 className="h-4 w-4 transition-all group-hover:scale-110" /> */}
              🦆
              <span className="sr-only">Acme Inc</span>
            </Link>
            {menus.map((menu) => {
              return (
                <Tooltip key={menu.href + "_desk1"}>
                  <TooltipTrigger asChild>
                    <Link href={menu.href} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                      {menu.icon}
                      <span className="sr-only">{menu.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{menu.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/settings" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={async () => {
                    await logout();
                    router.replace("/");
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs bg-white">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="#" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  {menus.map((menu) => {
                    return (
                      <Link key={menu.href + "_mob1"} href={menu.href} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                        {menu.icon}
                        {menu.label}
                      </Link>
                    );
                  })}

                  <Link href="/settings" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                {r.split("/").map((nav, i) => {
                  return (
                    <Fragment key={i}>
                      <BreadcrumbItem key={i}>
                        <BreadcrumbLink asChild>
                          <Link href="#">{nav != "" ? nav : "Dashboard"}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {i != r.split("/").length - 1 && <BreadcrumbSeparator key={i + "s"} />}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
            </div>
            <Link href={"/profile"} className="overflow-hidden rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} alt="User" />
                <AvatarFallback>O</AvatarFallback>
              </Avatar>
            </Link>
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-8">
            {children}
            <Toaster richColors position="top-right" theme="light" />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
