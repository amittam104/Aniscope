/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { account } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [loggedInUser, setLoggedInUser] = useState<null | any>();

  const getUser = async () => {
    try {
      const user = await account.get();
      console.log(user);
      setLoggedInUser(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoggedInUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser === null) redirect("/signin");

  return (
    <div className="pt-20 mb-20 ">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2 ">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                value={loggedInUser?.name || ""}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={loggedInUser?.email || ""}
                disabled
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={logout}>
            Log Out
          </Button>
          <Button type="submit">Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
