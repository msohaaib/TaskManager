import { useForm } from "react-hook-form";
import fullNameIcon from "../assets/icons/fullName.svg";
import emailIcon from "../assets/icons/email.svg";
import passwordIcon from "../assets/icons/password.svg";
import googleIcon from "../assets/icons/Google.svg";
import { Link } from "react-router-dom";
import { signup } from "../auth.js";

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
    <div className="flex flex-row">
      <div className="bg-[#E9EAEC] w-1/2 h-screen flex flex-col items-center justify-center">
        <h1 className="font-semibold text-3xl">
          The only way to <span className="text-[#3062D4]">do great work</span>{" "}
          is
          <br />
          <span className="text-[#3062D4]">love what you do.</span>
        </h1>
        <p className="font-semibold text-3xl text-[#3A424A] mt-4">
          -Steve Jobs
        </p>
      </div>

      <div className="w-1/2 h-screen flex flex-col items-center justify-center">
        <h1 className="font-semibold text-3xl mb-10">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                className={`border border-gray-400 w-100.75 h-11.25 pl-10 rounded-lg ${
                  errors.fullName ? "border-red-500" : ""
                }`}
                type="text"
              />
              {/* Error message positioned below input */}
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
                className={`border border-gray-400 w-100.75 h-11.25 pl-10 rounded-lg ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="email"
              />
              {/* Error message positioned below input */}
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
                className="border border-gray-400 w-100.75 h-11.25 pl-10 rounded-lg"
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
                className="border border-gray-400 w-100.75 h-11.25 pl-10 rounded-lg"
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
            className="w-100.75 h-11.75 text-white bg-[#0062FF] mt-6 rounded-lg"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center mt-8">
          <div className="h-px w-43.25 bg-[#E4E6EC] flex-1"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="h-px w-43.25 bg-[#E4E6EC] flex-1"></div>
        </div>

        <div className="flex flex-row mt-6">
          <button className="w-45.5 h-11.25 flex flex-row gap-x-3 items-center justify-center border border-[#E4E6EC] rounded-lg">
            <img src={googleIcon} className="h-6 w-6" alt="Google Icon" />
            <span>Google</span>
          </button>
        </div>

        <div className="mt-6">
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
