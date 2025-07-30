import { toast } from "@/components/ui/toast";
import axiosApi from "@/utils/axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      axiosApi
        .get(`/auth/verify-email?token=${token}`)
        .then(() => {
          toast({
            title: "Success",
            description: "Email verified successfully",
            variant: "success",
          });
          navigate("/");
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.response.data.message,
            variant: "error",
          });
        });
    }
    console.log(token);
  }, [searchParams, navigate]);

  return <div>verifying email ...</div>;
}

export default VerifyEmail;
