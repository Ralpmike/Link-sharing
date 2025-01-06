import { useEffect, useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Can't be empty"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Please check again"),
});

const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFocus = (field: string) => {
    setIsFocused((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setIsFocused((prevState) => ({ ...prevState, [field]: false }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    const formData = { email, password, confirmPassword };

    const validationResult = isLogin
      ? loginSchema.safeParse(formData)
      : registerSchema.safeParse(formData);

    if (!validationResult.success) {
      const newErrors: { [key: string]: string } = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path[0]) {
          newErrors[error.path[0]] = error.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    console.log("Form submitted successfully:", formData);
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsSubmitted(false);
    setErrors({});
  }, [isLogin]);

  return (
    <div className="h-screen bg-white md:bg-gray-100 mx-auto p-16 md:px-0">
      <div className="flex gap-2 mb-8 md:justify-center">
        <img src="logo.png" alt="logo" />
        <p className="text-gray-800 font-bold text-2xl md:text-3xl">devlinks</p>
      </div>

      <div className="md:bg-white md:w-[476px] mx-auto md:h-[510px] md:p-8 md:rounded">
        <h2 className="text-gray-800 font-bold text-xl md:text-2xl mb-2 md:mb-4">
          {isLogin ? "Login" : "Create Account"}
        </h2>
        <p className="text-[#737373] text-lg md:text-base mb-8">
          {isLogin
            ? "Add your details below to get back into the app"
            : "Let's get you started sharing your links"}
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`text-sm mb-2 ${errors.email ? "text-red-600" : ""}`}
            >
              Email address
            </label>
            <div
              className={`flex items-center gap-4 border px-4 py-2 rounded ${
                isFocused.email
                  ? "border-[#633CFF] my-2 shadow-md shadow-[#633CFF] ring-1"
                  : ""
              } ${
                errors.email ? "border-red-400" : ""
              } transition-all duration-200 ease-in-out`}
            >
              <img src="envelope.png" className="w-4 h-4" alt="email" />
              <input
                className="outline-none"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@gmail.com"
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
              />
              {errors.email && (
                <span className="text-sm text-red-600">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className={`text-sm mb-2 ${
                errors.password ? "text-red-600" : ""
              }`}
            >
              Password
            </label>
            <div
              className={`flex items-center gap-4 border px-4 py-2 rounded ${
                isFocused.password
                  ? "border-[#633CFF] shadow-md my-2 shadow-[#633CFF] ring-1"
                  : ""
              } ${
                errors.password ? "border-red-400" : ""
              } transition-all duration-200 ease-in-out`}
            >
              <img src="lock-key.png" className="w-4 h-4" alt="password" />
              <input
                className="outline-none"
                type="password"
                id="password"
                value={password}
                placeholder={
                  isLogin ? "Enter your password" : "At least 8 characters"
                }
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
              />
              {errors.password && (
                <span className="text-sm text-red-600">{errors.password}</span>
              )}
            </div>
          </div>

          {/* Confirm Password Field (only for registration) */}
          {!isLogin && (
            <div className="mb-8">
              <label
                htmlFor="confirmPassword"
                className={`text-sm ${
                  errors.confirmPassword ? "text-red-600" : ""
                }`}
              >
                Confirm Password
              </label>
              <div
                className={`flex items-center gap-4 border px-4 py-2 rounded ${
                  isFocused.confirmPassword
                    ? "border-[#633CFF] shadow-md my-2 shadow-[#633CFF] ring-1"
                    : ""
                } ${
                  errors.confirmPassword ? "border-red-400" : ""
                } transition-all duration-200 ease-in-out`}
              >
                <img
                  src="lock-key.png"
                  className="w-4 h-4"
                  alt="confirm-password"
                />
                <input
                  className="outline-none placeholder:text-sm"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm your password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={() => handleBlur("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-sm text-red-600">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            className="bg-[#633CFF] mb-4 px-4 py-2 rounded text-white w-full font-semibold"
            type="submit"
          >
            {isLogin ? "Login" : "Create new Account"}
          </button>

          {/* Toggle between Login/Register */}
          <div className="md:flex gap-2 justify-center text-center">
            <p className="text-[#737373]">
              {isLogin ? "Don't" : "Already"} have an account?
            </p>

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#633CFF] cursor-pointer"
            >
              {isLogin ? "Create an account" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
