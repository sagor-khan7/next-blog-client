import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  console.log(cookieStore.toString());

  const res = await fetch("http://localhost:5000/api/auth/get-session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });
  const session = await res.json();
  console.log(session);
  return (
    <div>
      <Button variant="outline">Click here</Button>
    </div>
  );
}
