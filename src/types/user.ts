export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponseDTO {
  success: boolean;
  data: {
    users: UserDTO[];
  };
}

export interface UserSignUpPayload {
  name?: string;
  email: string;
  password: string;
}