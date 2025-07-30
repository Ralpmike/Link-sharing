import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import FormInput from "@/components/custom/FormInput";
import { Link, useNavigate } from "react-router";
// import { AxiosError } from "axios";

const FormSchema = z
  .object({
    name: z.string().nonempty("Can't be empty"),
    email: z.string().nonempty("Can't be empty").email("Invalid email format"),
    password: z
      .string()
      .nonempty("Please check again")
      .min(6, "Password too short"),
    confirmPassword: z
      .string()
      .nonempty("Please check again")
      .min(6, "Password too short"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will attach the error to confirmPassword field
  });

export type FormSchemaType = z.infer<typeof FormSchema>;

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useAuth();

  const navigate = useNavigate();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // Validate on blur
  });

  async function onSubmit(data: FormSchemaType) {
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
    await registerUser(data);

    navigate("/");

    setIsLoading(false);

    form.reset(); // Reset the form after successful submission
  }

  return (
    <div className="flex flex-col items-center gap-12.5 justify-center min-h-screen bg-gray-lighter  mx-auto w-full">
      <div className="flex items-center gap-2">
        <img src="/solar_link.svg" alt="logo" />
        <h1 className="text-3xl font-bold">devlinks</h1>
      </div>

      <div className=" max-w-[29.75rem] mx-auto flex flex-col gap-10  w-full rounded-lg  bg-white p-10">
        <header className="space-y-2">
          <h1 className="size-HM">Create account</h1>
          <p className="font-normal text-[1rem] text-gray-dark">
            Let&apos;s get you started sharing your links!
          </p>
        </header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-dark">
                    Name
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="text"
                      Icon={Icon.UserIcon} // Use InboxIcon from lucide-react
                      placeholder="e.g. Alex Smith"
                      className="w-full"
                      error={form.formState.errors.email?.message || ""} // Display error message if exists
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
                      placeholder="At least 6 characters"
                      className="w-full"
                      error={form.formState.errors.password?.message || ""} // Display error message if exists
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-dark">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="password"
                      Icon={Icon.LockIcon} // Use InboxIcon from lucide-react
                      placeholder="At least 6 characters"
                      className="w-full"
                      error={
                        form.formState.errors.confirmPassword?.message || ""
                      } // Display error message if exists
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <p className="text-[0.75rem] text-gray-dark">
              Password must contain at least 6 characters
            </p>
            <Button
              type="submit"
              className="w-full py-3 text-[1rem] "
              disabled={
                isLoading ||
                form.formState.isSubmitting ||
                !form.formState.isValid
              }
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
          <p className="text-[1rem] text-center">
            Don&apos;t have an account?{" "}
            <Link to={"/"} className="text-primary">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
