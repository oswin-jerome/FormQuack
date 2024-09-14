"use client";
import { createForm } from "@/actions/domains";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AddForm = ({ domainId }: any) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <div>
      <Sheet open={open} onOpenChange={(e) => setOpen(e)}>
        <SheetTrigger asChild>
          <Button>ADD </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create A form</SheetTitle>
            <SheetDescription>Adding a form will allow you to receive submissions from your website</SheetDescription>
          </SheetHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const data = await createForm(domainId, name);
              if (!data.ok) {
                toast.error(data.err, {
                  style: {
                    accentColor: "red",
                  },
                  description: "Upgrade to pro plan",
                });
              } else {
                toast.success("Form Created", {
                  style: {
                    accentColor: "red",
                  },
                  description: "Integrate form in your website to continue",
                });
                router.push(`/domains/${domainId}/forms/${data.data.id}`);
              }
              setOpen(false);
            }}
            className="mt-4"
          >
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <Button className="mt-8">Save</Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddForm;
