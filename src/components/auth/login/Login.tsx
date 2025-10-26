"use client";
import React, { Suspense, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  InputElement,
  CheckboxElement,
} from "@/components/common/form-element";
import Link from "next/link";
import Image from "next/image";
import signInBackground from "@/assets/images/backgrounds/signin.svg";
import { useLogin } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { PopupMessage, Spinner } from "@/components/common";

const LoginComponent = () => {
  const {
    email,
    password,
    showPassword,
    emailError,
    passwordError,
    isLoading,
    handleChange,
    togglePasswordVisibility,
    validateEmail,
    validatePassword,
    onSubmit,
  } = useLogin();

  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/dashboard");
      }
    } else {
      setLoading(false);
    }
  }, [router, user, redirect]);

  return (
    <section id="login" className="w-full py-12">
      <div className="container">
        <div className="flex justify-center items-center w-full  min-h-[calc(100vh-170px)]">
          {loading ? (
            <div className="w-full relative z-[2] h-full flex justify-center items-center">
              <Spinner color="text-primary" />
            </div>
          ) : (
            <div className="flex shadow-custom rounded-2xl overflow-hidden bg-light dark:bg-dropdown min-w-[400px] w-full max-w-4xl">
              <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 lg:border-r lg:border-r-gray-200 dark:border-r-gray-700">
                <Image
                  src={signInBackground}
                  alt="Sign In Background"
                  className="h-full w-full object-cover"
                  quality={100}
                  priority
                />
              </div>
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="px-6 w-full space-y-6 py-4">
                  <div className="text-center">
                    <div className="mx-auto w-16 p-1 overflow-hidden h-16 border border-primary rounded-full flex items-center justify-center mb-6">
                      <Image
                        src={"/logo.png"}
                        alt="Logo"
                        className="h-full w-auto"
                        width={200}
                        height={200}
                        quality={100}
                        priority
                      />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      Welcome back
                    </h2>
                    <p className="mt-2 text-normal">
                      New here?{" "}
                      <Link
                        href="/register"
                        className="text-[#5143d9] hover:text-[#4338ca] font-medium"
                      >
                        Create an account
                      </Link>
                    </p>
                  </div>

                  <form onSubmit={onSubmit} method="POST" className="space-y-6">
                    <div className="w-full">
                      <PopupMessage messageShowOn={"login"} />
                    </div>

                    <InputElement
                      title="Enter email id"
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleChange}
                      onBlur={validateEmail}
                      placeholder=""
                      error={emailError}
                      isRequired
                    />

                    <div className="relative">
                      <InputElement
                        title="Enter password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder=""
                        error={passwordError}
                        onChange={handleChange}
                        onBlur={validatePassword}
                        isRequired
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible className="w-5 h-5" />
                        ) : (
                          <AiOutlineEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {" "}
                        {/* <CheckboxElement
                          title="Remember me?"
                          name="rememberMe"
                          value={false}
                          error={null}
                          onChange={() => console.log("Remember me changed")}
                          onBlur={() => console.log("Remember me blurred")}
                        /> */}
                      </div>
                      <Link
                        href="#"
                        className="text-[#5143d9] hover:text-[#4338ca] text-sm font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full cursor-pointer bg-[#5143d9] hover:bg-[#4338ca] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? "Please wait..." : "Login"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default function Login() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginComponent />
    </Suspense>
  );
}
