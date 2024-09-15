import { getUser } from "@/actions/auth";
import { getAllDomains } from "@/actions/domains";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Domain {
  domain: string;
  id: number;
  formCount: number;
}

const DomainsPage = async () => {
  const domains: Domain[] = await getAllDomains();
  const user = (await getUser()).data;
  return (
    <div>
      <div className="py-4 flex justify-between">
        <p className=" text-sm text-muted-foreground">
          {user.domainLimit - domains.length} out of {user.domainLimit} domains remaining
        </p>
        <Link href={"/domains/create"}>
          <Button>New Domain</Button>
        </Link>
      </div>
      <main className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
        {domains?.map((domain, i) => {
          return (
            <Link key={i} href={`/domains/${domain.id}`}>
              <Card className="cursor-pointer">
                <CardHeader>
                  <CardTitle>{domain.domain}</CardTitle>
                  <CardDescription>
                    {user.formsLimit - domain.formCount} out of {user.formsLimit} forms remaining
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </main>
      {domains.length == 0 && (
        <div className="flex flex-1 h-[calc(100vh-300px)] items-center justify-center rounded-lg">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">You have no domains</h3>
            <p className="text-sm text-muted-foreground">You can start exploring as soon as you add a domain.</p>
            <Link href={"/domains/create"}>
              <Button className="mt-4">Add Domain</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainsPage;
