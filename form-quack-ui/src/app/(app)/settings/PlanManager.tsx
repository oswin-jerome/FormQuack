"use client";
import { changePlan } from "@/actions/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";
import { CheckIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Plan = "basic" | "pro" | "enterprise";

type PlanDetails = {
  name: string;
  price: string;
  benefits: string[];
};

const plans: any = {
  BASIC: {
    name: "Basic",
    price: "Free",
    benefits: ["Up to 3 Domains", "3 Forms Per Domain", "24 hrs Delivery"],
  },
  PRO: {
    name: "Pro",
    price: "$5/month",
    benefits: ["Up to 10 Domains", "10 Forms Per Domain", "Immediate Email Delivery"],
  },
  PRO_PLUS: {
    name: "Pro +",
    price: "20$/month",
    benefits: ["Unlimited domains", "Unlimited forms per domain", "Immediate Email Delivery", "File support", "Custom Success and Error Pages"],
  },
};
const PlanManager = ({ user }: { user: User }) => {
  const [currentPlan, setCurrentPlan] = useState(user.plan);
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.keys(plans).map((plan) => (
            <Card
              key={plan}
              onClick={async () => {
                const res = await changePlan(plan);
                if (res.ok) {
                  router.refresh();
                  if (plan == "BASIC") {
                    setCurrentPlan("BASIC");
                  }
                  if (plan == "PRO") {
                    setCurrentPlan("PRO");
                  }
                  if (plan == "PRO_PLUS") {
                    setCurrentPlan("PRO_PLUS");
                  }
                  toast.info("Plan upgraded", {
                    description: "Your plan has been upgraded to " + plan,
                  });
                }
                // TODO: edge cases
              }}
              className={`cursor-pointer transition-colors ${currentPlan === plan ? "border-primary" : "hover:border-primary"}`}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {plans[plan].name}
                  {currentPlan === plan && <CheckIcon className="h-5 w-5 text-primary" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold mb-2">{plans[plan].price}</p>
                <ul className="text-sm space-y-1">
                  {plans[plan].benefits.map((benefit: any, index: any) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanManager;
