import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { auth } from "@/firebase/config";

const formSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(6, { message: "Password must be at-least of six charecters long." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at-least of six charecters long." }),
  })
  .refine(
    (data) => data.password === data.confirmPassword, // Password and confirm must be equal
    {
      message: "Passwords don't match", // Custom error message
      path: ["confirmPassword"], // Path of the error field
    }
  );

export function UserSignUpForm() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createUserWithEmailAndPassword(values.email, values.confirmPassword);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
                <FormDescription>
                  Your e-mail will not be reveled to anyone.
                </FormDescription>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-type Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Re-type to confirm password."
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
            Sign Up with Email
          </Button>
        </form>
      </Form>

      {/* </div> */}
    </>
  );
}
