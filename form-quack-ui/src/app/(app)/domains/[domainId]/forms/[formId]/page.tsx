import { getAllEmails } from "@/actions/email";
import { getForm } from "@/actions/forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import ControlEmails from "./ControlEmails";
import PayloadView from "./submissions/PayloadView";

const FormDetails = async ({ params }: { params: { formId: number } }) => {
  const form = (await getForm(params.formId)).data;
  const emails = (await getAllEmails()).data;

  const html = `<html>
	<body>
		<form action="https://formquack.io/forms/${params.formId}" method="POST" > 
			<input name="name" />
			<input name="email" type="email" />
		</form>
	</body>
</html>`;

  const rest = `const handleForm = ()=>{
	fetch("https://formquack.io/forms/${params.formId}",{
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

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div>
            <CardTitle className="flex items-baseline gap-1  tabular-nums">Domain</CardTitle>
            <CardDescription>{form?.domain?.domain}</CardDescription>
          </div>
        </Card>
        <Link href={form.id + "/submissions"}>
          <Card className="p-4">
            <div>
              <CardDescription>Total Submissions</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">{form.totalSubmissions}</CardTitle>
            </div>
          </Card>
        </Link>
        <Card className="p-4">
          <div>
            <CardDescription>Submissions This Month</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">{form.submissionsThisMonth}</CardTitle>
          </div>
        </Card>
      </div>
      <ControlEmails form={form} emails={emails} />
    </main>
  );
};

export default FormDetails;
