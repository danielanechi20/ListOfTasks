import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserSignUpForm } from "@/components/forms/user-signup-form";
import { useState } from "react";
import { UserSignInForm } from "../forms/user-signin-form";
import SocialAuth from "../SocialAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

export default function AuthenticationPage() {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  // ✅ Fix: Removed incorrect boolean type
  const [isSignUp, setIsSignUp] = useState(true);

  // ✅ Fix: Prevent crash if location.state is undefined
  const parentPath = location.state?.from?.pathname || "/dashboard";

  if (loading) {
    return <div>Loading...</div>;
  }

  // ✅ Fix: Ensure `user` exists before redirecting
  if (user) {
    return <Navigate replace to={parentPath} />;
  }

  return (
    <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 border rounded-md overflow-hidden">
      <Button
        type="button"
        onClick={() => setIsSignUp((prev) => !prev)}
        variant="ghost"
        size="sm"
        className="absolute right-4 top-4 md:right-8 md:top-8"
      >
        {isSignUp ? "Log In" : "Sign Up"}
      </Button>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <img
          src="/web_auth_page.jpg"
          alt="Authentication"
          className="absolute inset-0 object-cover h-full w-full"
        />
      </div>
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignUp
                ? "Enter your email to create your account"
                : "Log in to your account"}
            </p>
          </div>
          <div className="grid gap-6">
            {isSignUp ? <UserSignUpForm /> : <UserSignInForm />}
            <SocialAuth />
          </div>
        </div>
      </div>
    </div>
  );
}
