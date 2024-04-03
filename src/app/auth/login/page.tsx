import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyLogin from "./CompanyLogin";
import UserLogin from "./UserLogin";
import H1 from "@/components/ui/h1";

export default function SignUp() {
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <H1>Login</H1>
      </div>
      <Tabs defaultValue="user">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <UserLogin />
        </TabsContent>
        <TabsContent value="company">
          <CompanyLogin />
        </TabsContent>
      </Tabs>
    </main>
  );
}
