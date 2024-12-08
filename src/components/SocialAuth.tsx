import {
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";
const SocialAuth = () => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  if (googleUser) {
    return <h1>{"Logged in as: " + googleUser.user.displayName}</h1>;
  }
  if (githubUser) {
    return <h1>{"Logged in as: " + githubUser.user.displayName}</h1>;
  }
  if (googleError) {
    toast.error(googleError.message);
  }
  if (githubError) {
    toast.error(githubError.message);
  }
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <Button
          className="flex-1"
          variant="outline"
          type="button"
          disabled={googleLoading}
          onClick={() => signInWithGoogle()}
        >
          {googleLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          type="button"
          disabled={githubLoading}
          onClick={() => signInWithGithub()}
        >
          {githubLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button>
      </div>
    </>
  );
};

export default SocialAuth;
