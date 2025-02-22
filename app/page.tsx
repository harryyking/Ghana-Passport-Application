import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/login')

  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-1">
      <h1 className="text-4xl font-semibold">Ghana Passport Application</h1>
      <p className="text-muted-foreground text-lg">Apply for your Ghanaian Passport Application</p>
    </div>
    </div>
  );
}
