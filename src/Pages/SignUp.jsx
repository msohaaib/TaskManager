import { useForm } from "react-hook-form";
import fullNameIcon from "../assets/icons/fullName.svg";
import emailIcon from "../assets/icons/email.svg";
import passwordIcon from "../assets/icons/password.svg";
import googleIcon from "../assets/icons/Google.svg";
import { Link } from "react-router-dom";
import { signup, loginWithGoogle } from "../auth.js";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signup(data.fullName, data.email, data.password);
      alert("Signup successful! You can now login.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left side (Text) */}
      <div className="bg-[#E9EAEC] w-full md:w-1/2 h-screen flex flex-col items-center justify-center hidden md:flex">
        <h1 className="font-semibold text-3xl text-center md:text-left">
          The only way to <span className="text-[#3062D4]">do great work</span>{" "}
          is
          <br />
          <span className="text-[#3062D4]">love what you do.</span>
        </h1>
        <p className="font-semibold text-3xl text-[#3A424A] mt-4 text-center md:text-left">
          -Steve Jobs
        </p>
      </div>

      {/* Right side (Form) */}
      <div className="w-full md:w-1/2 h-screen flex flex-col items-center justify-center px-6 md:px-0">
        <h1 className="font-semibold text-3xl mb-10 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="flex flex-col">
            {/* Full Name */}
            <div className="relative mb-6">
              <img
                className="absolute left-3 top-1/2 w-[21.5px] h-[17.2px] -translate-y-1/2 text-gray-400"
                src={fullNameIcon}
                alt="Full Name Icon"
              />
              <input
                {...register("fullName", {
                  required: "Full name is required",
                })}
                placeholder="Full Name"
                className={`border border-gray-400 w-full h-11.25 pl-10 rounded-lg ${
                  errors.fullName ? "border-red-500" : ""
                }`}
                type="text"
              />
              <p className="text-red-500 text-sm absolute left-0 -bottom-5">
                {errors.fullName?.message}
              </p>
            </div>

            {/* Email */}
            <div className="relative mb-6">
              <img
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                src={emailIcon}
                alt="Email Icon"
              />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Your email"
                className={`border border-gray-400 w-full h-11.25 pl-10 rounded-lg ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="email"
              />
              <p className="text-red-500 text-sm absolute left-0 -bottom-5">
                {errors.email?.message}
              </p>
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <img
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                src={passwordIcon}
                alt="Password Icon"
              />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Password"
                className="border border-gray-400 w-full h-11.25 pl-10 rounded-lg"
                type="password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm absolute left-0 -bottom-5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative mb-6">
              <img
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                src={passwordIcon}
                alt="Confirm Password Icon"
              />
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                placeholder="Repeat Password"
                className="border border-gray-400 w-full h-11.25 pl-10 rounded-lg"
                type="password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm absolute left-0 -bottom-5">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            className="w-full h-11.75 text-white bg-[#0062FF] mt-6 rounded-lg"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center mt-8 w-full justify-center">
          <div className="h-px w-1/3 bg-[#E4E6EC] flex-1"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="h-px w-1/3 bg-[#E4E6EC] flex-1"></div>
        </div>

        {/* Google Button */}
        <div className="flex flex-row gap-x-10 mt-6 w-full justify-center">
          <button
            onClick={() => loginWithGoogle("google")}
            className="w-full md:w-45.5 h-11.25 flex flex-row gap-x-3 items-center justify-center border border-[#E4E6EC] rounded-lg"
          >
            <img src={googleIcon} className="h-6 w-6" alt="Google Icon" />
            <span>Google</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-500">Already have an account? </span>
          <Link to="/" className="text-[#3062D4]">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
