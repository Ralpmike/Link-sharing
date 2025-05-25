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

const FormSchema = z.object({
  email: z.string().nonempty("Can't be empty").email("Invalid email format"),
  password: z
    .string()
    .nonempty("Please check again")
    .min(6, "Password too short"),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export default function Login() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Validate on blur
  });

  function onSubmit(data: FormSchemaType) {
    console.log("Form submitted with data:", data);

    if (!data.email || !data.password) {
      toast({
        title: "Error",
        description:
          form.formState.errors.email?.message ||
          form.formState.errors.password?.message,
        variant: "error",
      });
    }

    toast({
      title: "You submitted the following values:",
      description: "" + data.email,
      variant: "success",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-lighter  mx-auto w-full">
      <div className=" max-w-[29.75rem] mx-auto flex flex-col gap-10  w-full rounded-lg shadow-md bg-white p-10">
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
            <Button type="submit" className="w-full py-3">
              Submit
            </Button>
          </form>
          <p className="text-[1rem] text-center">
            Don&apos;t have an account?{" "}
            <span className="text-primary">Create account</span>
          </p>
        </Form>
      </div>
    </div>
  );
}
