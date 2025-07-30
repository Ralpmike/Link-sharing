// import axiosInstance from "@/base/axios";

import type { FormUserSchemaType } from "@/pages/login";
import axiosApi from "@/utils/axios";
import axios from "axios";
import { toast } from "@/components/ui/toast";
import type { FormSchemaType } from "@/pages/signup";

const registerUser = async (userData: FormSchemaType): Promise<boolean> => {
  try {
    const response = await axiosApi.post("/auth/register", userData);
    if (response && response.status === 201) {
      toast({
        title: "Error",
        description: response.data.message,
        variant: "success",
      });
      console.log("User registered successfully");

      return true;
    }
    return false;
  } catch (error) {
    console.error("Error submitting form:", error);
    if (axios.isAxiosError(error) && error.response) {
      toast({
        title: "Error",
        description:
          error.response.data.error.error || error.response.data.error.message,
        variant: "error",
      });
    } else {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "error",
      });
    }
    return false;
  }
};

// const editUser = async (
//   userData: UserFormValues,
//   userId: string
// ): Promise<void> => {
//   try {
//     const response = await axiosApi.put(`/users/${userId}`, userData);
//     if (response && response.status === 200) {
//       toast.success("Profile updated successfully!");
//     }
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     if (axios.isAxiosError(error) && error.response) {
//       toast.error(`Error: ${error.response.data.message || "Unknown error"}`);
//     } else {
//       toast.error("An unexpected error occurred. Please try again.");
//     }
//   }
// };

// const deleteUser = async (id: string) => {
//   try {
//     const response = await axiosApi.delete(`/users/${id}`);
//     if (response && response.status === 200) {
//       toast.success("User deleted successfully!");
//     }
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     if (axios.isAxiosError(error) && error.response) {
//       toast.error(`Error: ${error.response.data.message || "Unknown error"}`);
//     } else {
//       toast.error("An unexpected error occurred. Please try again.");
//     }
//   }
// };

const loginUser = async (user: FormUserSchemaType): Promise<boolean> => {
  try {
    const response = await axiosApi.post("/auth/login", user);
    if (response && response.status === 200) {
      toast({
        title: "Error",
        description: response.data.message,
        variant: "success",
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error submitting form:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.log("error", error.response.data);
      toast({
        title: "Error",
        description:
          error.response.data.message ||
          error.response.data.error.error ||
          error.response.data.error.message,
        variant: "error",
      });
    } else {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "error",
      });
    }
    return false;
  }
};

const userAuthServices = {
  registerUser,
  // editUser,
  // deleteUser,
  loginUser,
};

export default userAuthServices;
