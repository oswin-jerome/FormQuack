import { getUser } from "@/actions/auth";
import { getDomain } from "@/actions/domains";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Domain, FormOverview } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddForm from "./AddForm";

const DomainDetails = async ({ params }: { params: { domainId: number } }) => {
  const data = await getDomain(params.domainId);
  if (!data.ok) {
    return notFound();
  }
  const domain: Domain = data.data;
  const forms: FormOverview[] = domain.forms;
  const user = (await getUser()).data;

  return (
    <main className="grid gap-4">
      <Card className="cursor-pointer">
        <CardHeader>
          <CardTitle>{domain.domain}</CardTitle>
          <CardDescription>
            {user.formsLimit - domain.formCount} out of {user.formsLimit} forms remaining
          </CardDescription>
        </CardHeader>
        <CardContent>Chart</CardContent>
      </Card>
      <div className="flex justify-between items-center mt-8">
        <h3 className="text-xl font-bold">Forms</h3>
        <AddForm domainId={params.domainId} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {forms.map((form) => {
          return (
            <Link href={`/domains/${params.domainId}/forms/${form.id}`} key={form.id}>
              <Card>
                <CardHeader className="">
                  <div className=" flex justify-between">
                    <div>
                      <CardTitle>{form.name}</CardTitle>
                      <CardDescription>{form.totalSubmissions} Submissions</CardDescription>
                    </div>
                    <div>
                      <Switch checked={form.active}></Switch>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default DomainDetails;
