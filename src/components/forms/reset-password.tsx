import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at-least of six charecters long." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at-least of six charecters long." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }); // 👈 Here we define our form schema

const UpdatePasswordForm = () => {
  const [updatePassword, updating, error] = useUpdatePassword(auth);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const success = await updatePassword(data.password);
    if (success) {
      toast.success("Password updated successfully");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }, // 👈 Here we define our form
  });

  if (error) {
    toast.error(error.message);
  }
  return (
    <div className="border rounded-sm">
      <h1 className="bg-muted p-4 font-bold text-primary">Update password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="m-4">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...form.register("password")}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...form.register("confirmPassword")}
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.confirmPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button className="mt-2" type="submit">
            {updating && <Loader2 className="animate-spin" size={20} />}
            {updating ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePasswordForm;
