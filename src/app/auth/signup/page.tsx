import CompanySignUp from "./CompanySignUp";
import H1 from "@/components/ui/h1";

export default function SignUp() {
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <H1>Company Sign Up</H1>
      </div>
      <CompanySignUp />
    </main>
  );
}
