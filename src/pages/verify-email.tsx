import { toast } from "@/components/ui/toast";
import axiosApi from "@/utils/axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  // const [status, setStatus] = useState<"loading" | "success" | "error">(
  //   "loading"
  // );
  // const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast({
        title: "Error",
        description: "Verification token is missing.",
        variant: "error",
      });

      return;
    }

    const verifyUserEmail = async () => {
      try {
        const res = await axiosApi.get(`/auth/verify-email?token=${token}`);
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
        navigate("/");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "error",
        });
      }
    };
    verifyUserEmail();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying Email...</h1>
        <p className="text-gray-600">Please wait while we verify your email.</p>
      </div>
    </div>
  );
}

export default VerifyEmail;
