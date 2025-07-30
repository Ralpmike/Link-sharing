"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import FormInput from "@/components/custom/FormInput";
import { Icon } from "@/components/ui/icon";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const FormSchema = z.object({
  email: z.string().nonempty("Can't be empty").email("Invalid email format"),
  password: z
    .string()
    .nonempty("Please check again")
    .min(6, "Password too short"),
});

export type FormUserSchemaType = z.infer<typeof FormSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormUserSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Validate on blur
  });

  async function onSubmit(data: FormUserSchemaType) {
    try {
      setIsLoading(true);
      if (!data.email || !data.password) {
        toast({
          title: "Error",
          description:
            form.formState.errors.email?.message ||
            form.formState.errors.password?.message,
          variant: "error",
        });
        return;
      }
      setIsLoading(false);
      const success = await loginUser(data);

      if (success) {
        navigate("dashboard");
        form.reset();
      }
    } finally {
      setIsLoading(false); // Ensure spinner stops regardless of success or failure
    }
  }

  // if (isLoading && form.formState.isDirty) {
  //   return (
  //     <div className="flex items-center justify-center h-screen backdrop-blur-sm bg-gray-100">
  //       <Button disabled>
  //         <Loader2 className="animate-spin h-12 w-12" />
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-center gap-12.5 justify-center min-h-screen bg-gray-lighter  mx-auto w-full">
      <div className="flex items-center gap-2">
        <img src="/solar_link.svg" alt="logo" />
        <h1 className="text-3xl font-bold">devlinks</h1>
      </div>

      <div className=" max-w-[29.75rem] mx-auto flex flex-col gap-10  w-full rounded-lg  bg-white p-10">
        <header className="space-y-2">
          <h1 className="size-HM">Login</h1>
          <p className="font-normal text-[1rem] text-gray-dark">
            Add your details below to get back into the app
          </p>
        </header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-dark">
                    Emial address
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="email"
                      Icon={Icon.MessageIcon} // Use InboxIcon from lucide-react
                      placeholder="e.g. alex@email.com"
                      className="w-full"
                      error={form.formState.errors.email?.message || ""} // Display error message if exists
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-dark">
                    Password
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="password"
                      Icon={Icon.LockIcon} // Use InboxIcon from lucide-react
                      placeholder="Enter your password"
                      className="w-full"
                      error={form.formState.errors.password?.message || ""} // Display error message if exists
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-3 text-[1rem] "
              disabled={
                isLoading ||
                form.formState.isSubmitting ||
                !form.formState.isValid
              }
            >
              {isLoading || form.formState.isSubmitting ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
          <p className="text-[1rem] text-center">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="text-primary">
              Create account
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
