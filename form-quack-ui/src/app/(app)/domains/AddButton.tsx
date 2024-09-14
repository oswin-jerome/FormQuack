// "use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-label";
import { Sheet } from "lucide-react";

const AddButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>New Domain</Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Add your domain.</SheetTitle>
        </SheetHeader>
        <form className="mt-8">
          <div className="grid gap-2">
            <Label htmlFor="domain">Domain</Label>
            <Input id="domain" className="bg-white text-primary" type="text" placeholder="example.com" required />
          </div>
        </form>
        <SheetFooter className="mt-4">
          <Button>Add Domain</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddButton;
