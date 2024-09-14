import { getUser } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChangePassword from "./ChangePassword";

export default async function ProfilePage() {
  const user = (await getUser()).data;

  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <CardDescription>View and manage your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="User" />
              <AvatarFallback>O</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Account Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={user.name} readOnly />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} readOnly />
              </div>
            </div>
          </div>
          <div>
            <ChangePassword />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
