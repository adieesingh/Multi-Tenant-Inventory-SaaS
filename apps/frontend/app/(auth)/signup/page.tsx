import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import Link from "next/link";

export default function Signup(){
    
    return ( <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md rounded-2xl border shadow-lg">
        <CardContent className="p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
               Create a workspace
            </h1>

            <p className="text-sm text-muted-foreground">
              Welcome ! Please sign up.
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="Enter a organization Name">Organization Name</Label>

              <Input
                id="name"
                type="text"
                placeholder="Singh Footwear"
                className={"w-full p-2 rounded-md border"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Enter a email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={"w-full p-2 rounded-md border"}
              />
            </div>
             <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="address">Address</Label>

               
              </div>

              <Input
                id="address"
                type="text"
                placeholder="RN 12,BLG-1,MUMBAI,MAH"
                className={"w-full p-2 rounded-md border"}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="phone">Phone No</Label>

               
              </div>

              <Input
                id="phone"
                type="tel"
                placeholder="+919876543210"
                className={"w-full p-2 rounded-md border"}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>

               
              </div>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={"w-full p-2 rounded-md border"}
              />
            </div>

            <Button className="w-full bg-blue-500  hover:bg-blue-900 hover:cursor-pointer p-2 rounded-lg text-white"  >
              Sign Up
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an workspace?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
    )
  
}
