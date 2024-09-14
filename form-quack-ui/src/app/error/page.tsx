import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-800">Oops! Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">We're sorry, but we encountered an error while processing your request. Please try again or contact support if the problem persists.</p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
