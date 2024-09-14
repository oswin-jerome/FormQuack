"use client";
import { addEmail, deleteEmail } from "@/actions/email";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Email } from "@/types";
import { TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const EmailManager = ({ emails }: { emails: Email[] }) => {
  const [newEmail, setNewEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const router = useRouter();
  const handleAddEmail = async () => {
    const res = await addEmail(newEmail);

    if (res.ok) {
      toast.success("Email Added", {
        description: "Email id is added to the system.",
      });
      router.refresh();
      setNewEmail("");
    } else {
      toast.error("Oops", {
        description: res.err,
      });
    }
  };

  const removeEmail = async (id: number) => {
    const res = await deleteEmail(id);
    if (res.ok) {
      toast.warning("Deleted", {
        description: "Email id deleted from system.",
      });
      router.refresh();
    } else {
      toast.error("Oops", {
        description: res.err,
      });
    }
  };

  const saveEdit = () => {
    if (editingId !== null) {
      //   setEmails(emails.map((email) => (email.id === editingId ? { ...email, address: newEmail } : email)));
      setEditingId(null);
      setNewEmail("");
    }
  };
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Manage Emails</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter email address" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="flex-grow" />
              <Button onClick={editingId !== null ? saveEdit : handleAddEmail}>{editingId !== null ? "Save" : "Add"}</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Linked Forms</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emails?.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell>{email.email}</TableCell>
                    <TableCell>{email.formCount}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => removeEmail(email.id)}>
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default EmailManager;
