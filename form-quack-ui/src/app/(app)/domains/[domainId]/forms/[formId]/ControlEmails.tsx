"use client";
import { setEmailForwarding, updateEmail } from "@/actions/forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Email, Form } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const ControlEmails = ({ form, emails }: { form: Form; emails: Email[] }) => {
  const [enable, setEnable] = useState(form.forwardToEmail);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex">
        <div className="flex justify-between">
          <div>
            <CardTitle>Forward to Emails</CardTitle>
            <CardDescription>Form submissions will be forwarded to selected emails.</CardDescription>
          </div>
          <div>
            {loading && <ClipLoader size={18} className="mr-1" />}
            <Switch
              checked={enable}
              disabled={loading}
              onCheckedChange={async (e) => {
                setLoading(true);
                await setEmailForwarding(form.id, e);
                setEnable(e);
                setLoading(false);
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table
          className={cn({
            "opacity-30 pointer-events-none cursor-not-allowed": !enable,
          })}
        >
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.map((email) => {
              return (
                <TableRow key={email.id}>
                  <TableCell className="font-medium">{email.email}</TableCell>
                  <TableCell className="">
                    <Switch
                      checked={form.emails?.findIndex((em) => em.id === email.id) != -1}
                      onCheckedChange={async (e) => {
                        setLoading(true);
                        await updateEmail(form.id, email.id, e);
                        router.refresh();
                        setLoading(false);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ControlEmails;
