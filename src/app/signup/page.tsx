"use client";
import { SignUp, useUser } from "@stackframe/stack";
// import {useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Page() {
  const currentUser = useUser();
  const router = useRouter();

 useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full p-7">
        <SignUp />
      </div>
    </div>
  );
}
