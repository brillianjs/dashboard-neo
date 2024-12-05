import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/signin");
  }, [router]);
  return (
    <div>
      <p>You will be redirected to the dashboard page.</p>
    </div>
  );
}
