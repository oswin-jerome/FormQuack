"use client";
import { manageAckMessage, manageAckStatus } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Ack = ({ form }: { form: Form }) => {
  const [enable, setEnable] = useState(form.sendAck);
  const [msg, setMsg] = useState(form.ackMessage);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Send Ack to submissions</CardTitle>
            <CardDescription>Your form should have a email field for this to work.</CardDescription>
          </div>
          <div>
            {loading && <ClipLoader size={18} className="mr-1" />}
            <Switch
              checked={enable}
              disabled={loading}
              onCheckedChange={async (e) => {
                setLoading(true);
                await manageAckStatus(form.id, e);
                setEnable(e);
                setLoading(false);
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <label htmlFor="ack">Ack message</label>
          <Textarea
            disabled={!enable}
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            id="ack"
          ></Textarea>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={!enable}
          onClick={async () => {
            setLoading(true);
            await manageAckMessage(form.id, msg);
            setLoading(false);
          }}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Ack;
