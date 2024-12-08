import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { auth } from "@/firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must be at-least of six charecters long." }),
});

export function UserSignInForm() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signInWithEmailAndPassword(values.email, values.password);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (user) {
    return (
      <h1 className="text-center bg-green-400 font-semibold py-1 rounded-sm">
        {"Logged in as: " + user.user.email}
      </h1>
    );
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      {/* <div className={cn("grid gap-6", className)} {...props}> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="test@example.com"
                    type="email"
                    disabled={loading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="create a password"
                    type="password"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="flex w-full mt-2" type="submit" disabled={loading}>
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </form>
      </Form>
    </>
  );
}
