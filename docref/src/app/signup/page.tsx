"use client";
import { SignUp, useUser } from "@stackframe/stack";
// import {useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";

export default function Page() {
  const currentUser = useUser();
  const router = useRouter();
  if (currentUser) {
    // If the user is already signed in, redirect to the home page
    router.push("/dashboard");
    return null; // Prevent rendering the SignUp component
  }


  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full p-7">
        <SignUp />
      </div>
    </div>
  );
}
