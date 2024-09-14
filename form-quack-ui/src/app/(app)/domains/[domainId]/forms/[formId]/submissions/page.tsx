// "use client";

import { getSubmissions } from "@/actions/forms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Submission } from "@/types";
import PayloadView from "./PayloadView";

const SubmissionsPage = async ({ params }: { params: { formId: string } }) => {
  const submissions: Submission[] = (await getSubmissions(params.formId)).data;

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>View all your form submissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Payload</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((sub) => {
                return (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.id}</TableCell>
                    <TableCell className="">
                      <PayloadView payload={sub.payload} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SubmissionsPage;
