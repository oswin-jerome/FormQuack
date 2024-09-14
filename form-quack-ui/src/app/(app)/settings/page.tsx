import { getUser } from "@/actions/auth";
import { getAllEmails } from "@/actions/email";
import EmailManager from "./EmailManager";
import PlanManager from "./PlanManager";

export default async function SettingsPage() {
  const emails = (await getAllEmails()).data;
  const user = (await getUser()).data;

  return (
    <div className="">
      <div className="space-y-6">
        <EmailManager emails={emails} />
        <PlanManager user={user} />
      </div>
    </div>
  );
}
