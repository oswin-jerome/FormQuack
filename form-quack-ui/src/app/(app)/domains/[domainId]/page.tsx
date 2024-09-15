import { getUser } from "@/actions/auth";
import { getDomain } from "@/actions/domains";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Domain, FormOverview } from "@/types";
import { File, Globe } from "lucide-react";
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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forms</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {domain.formCount} / {user.formsLimit}
            </div>
            <Progress value={(domain.formCount / user.formsLimit) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{((domain.formCount / user.formsLimit) * 100).toFixed(0)}% of total forms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Domain</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{domain.domain}</div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center mt-8">
        <h3 className="text-xl font-bold">Forms</h3>
        <AddForm domainId={params.domainId} />
      </div>
      <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-4">
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
