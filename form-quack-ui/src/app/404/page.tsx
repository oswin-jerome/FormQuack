"use client";
import { Button } from "@/components/ui/button";
import { Home, RotateCcw } from "lucide-react";
import { useState } from "react";

export default function ErrorPage({ statusCode = 404, title = "Page Not Found", description = "Sorry, we couldn't find the page you're looking for." }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate page refresh
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="text-center">
        <div className="mb-8">
          <img src="/placeholder.svg?height=200&width=200" alt="Error illustration" className="mx-auto w-48 h-48" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-2">{statusCode}</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">{title}</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => (window.location.href = "/")}>
            <Home className="mr-2 h-4 w-4" />
            Go to Homepage
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleRefresh} disabled={isLoading}>
            <RotateCcw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Refreshing..." : "Refresh Page"}
          </Button>
        </div>
      </div>
      <footer className="mt-16 text-center text-gray-500 text-sm">© {new Date().getFullYear()} Your Company Name. All rights reserved.</footer>
    </div>
  );
}
