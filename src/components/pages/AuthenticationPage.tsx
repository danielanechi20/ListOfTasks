import { Link, Navigate, useLocation } from "react-router-dom";
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
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const parentpath: string = location.state.from.pathname;
  if (loading) {
    return <div>Loading...</div>;
  }
  if (parentpath && user) {
    return <Navigate replace to={parentpath} />;
  }
  return (
    <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 border rounded-md overflow-hidden">
      <Button
        type="button"
        onClick={() => {
          setIsSignUp(!isSignUp);
        }}
        variant={"ghost"}
        size={"sm"}
        className={"absolute right-4 top-4 md:right-8 md:top-8"}
      >
        {isSignUp ? "Log In" : "Sign Up"}
      </Button>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <img
          src="/task_cover_pic.jpg"
          className="absolute inset-0 object-cover h-full w-full"
        />
        <div className="relative z-20 flex items-center text-lg font-medium text-purple-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          SUA Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignUp
                ? "Enter your email below to create your account"
                : "Log in to your account"}
            </p>
          </div>
          <div className="grid gap-6">
            {isSignUp ? <UserSignUpForm /> : <UserSignInForm />}
            <SocialAuth />
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
