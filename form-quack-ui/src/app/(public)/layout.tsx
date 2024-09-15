"use client";

import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div>Oops</div>}>
      <div>{children}</div>
    </Suspense>
  );
}
