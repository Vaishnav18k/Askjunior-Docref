"use client";
import { SignUp, useUser } from "@stackframe/stack";

export default function CustomSignUpPage() {


  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full p-7">
        <SignUp />
      </div>
    </div>
  );
}
