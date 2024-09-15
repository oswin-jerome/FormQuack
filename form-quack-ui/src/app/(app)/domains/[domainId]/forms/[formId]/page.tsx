import { getAllEmails } from "@/actions/email";
import { getForm } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Globe } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ControlEmails from "./ControlEmails";
import PayloadView from "./submissions/PayloadView";

const FormDetails = async ({ params }: { params: { formId: number } }) => {
  const form = (await getForm(params.formId)).data;
  if (form == undefined) {
    redirect("/404");
  }
  const emails = (await getAllEmails()).data;

  const html = `<html>
	<body>
		<form action="${process.env.PUBLIC_APP_DOMAIN}/api/forms/${params.formId}" method="POST" > 
			<input name="name" />
			<input name="email" type="email" />
		</form>
	</body>
</html>`;

  const rest = `const handleForm = ()=>{
	fetch("${process.env.PUBLIC_APP_DOMAIN}/api/forms/${params.formId}",{
	  method:'POST',
	  body: JSON.stringify({
		  name:"john"
	  });
    });
}`;

  return (
    <main className="space-y-4">
      <Tabs defaultValue="form" className="w-[calc(100vw-32px)] md:w-auto">
        <Card className="w-full">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">HTML Form</TabsTrigger>
              <TabsTrigger value="rest">REST API</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="form" className="w-full">
              <PayloadView payload={html} language={"html"} highlight="3-6" />
            </TabsContent>
            <TabsContent value="rest">
              <PayloadView payload={rest} highlight="2-7" />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions this month</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {form.submissionsThisMonth} / {form.submissionLimitPerForm}
            </div>
            <Progress value={(form.submissionsThisMonth / form.submissionLimitPerForm) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{((form.submissionsThisMonth / form.submissionLimitPerForm) * 100).toFixed(0)}% Reached for this month</p>
          </CardContent>
        </Card>
        <Card className="lg:col-start-1">
          <CardHeader>
            <CardTitle className="flex items-baseline gap-1  tabular-nums">Domain</CardTitle>
            <CardDescription>{form?.domain?.domain}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/domains/${form.domain.id}/forms/${form.id}/submissions`}>
              <Button>View Submissions</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="lg:row-span-2 lg:row-start-1 lg:col-start-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions Overview</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{form.submissionsToday}</div>
            <p className="text-xs text-muted-foreground">Today</p>
            <div className="text-lg font-semibold mt-2">{form.submissionsThisMonth}</div>
            <p className="text-xs text-muted-foreground">This Month</p>
            <div className="text-lg font-semibold mt-2">{form.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">All Time</p>
          </CardContent>
        </Card>
        <ControlEmails className="lg:row-start-1 lg:col-span-2 lg:row-span-2" form={form} emails={emails} />
      </div>
    </main>
  );
};

export default FormDetails;
