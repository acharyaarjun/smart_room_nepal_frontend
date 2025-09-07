"use client";
import React, { useState, useEffect, Suspense } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  InputElement,
  SelectElement,
  CheckboxElement,
} from "@/components/common/form-element";
import { PopupMessage } from "@/components/common";
import { Spinner } from "@/components/common";
import Link from "next/link";
import Image from "next/image";
import signUpBackground from "@/assets/images/backgrounds/signin.svg";
import useRegister from "@/hooks/use-register";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";

const RegisterComponent = () => {
  const {
    formData,
    isLoading,
    errors,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleSelectChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    validateField,
    onSubmit,
  } = useRegister();

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
        if (user.role === "host") {
          router.push("/host/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } else {
      setLoading(false);
    }
  }, [router, user, redirect]);

  const genderOptions = [
    { value: "", label: "Select gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const occupationOptions = [
    { value: "", label: "Select occupation status" },
    { value: "employed", label: "Employed" },
    { value: "student", label: "Student" },
    { value: "self-employed", label: "Self Employed" },
    { value: "unemployed", label: "Unemployed" },
  ];

  const maritalStatusOptions = [
    { value: "", label: "Select marital status" },
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  return (
    <section id="register" className="w-full py-8">
      <div className="container">
        <div className="flex justify-center items-start w-full min-h-screen">
          {loading ? (
            <div className="w-full relative z-[2] h-full flex justify-center items-center">
              <Spinner color="text-primary" />
            </div>
          ) : (
            <div className="flex shadow-custom rounded-2xl overflow-hidden bg-light dark:bg-dropdown w-full max-w-6xl">
              <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 lg:border-r lg:border-r-gray-200 dark:border-r-gray-700">
                <Image
                  src={signUpBackground}
                  alt="Sign Up Background"
                  className="h-full w-full object-cover"
                  quality={100}
                  priority
                />
              </div>

              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="px-8 w-full py-8">
                  <div className="text-center mb-6">
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
                      Create Account
                    </h2>
                    <p className="mt-2 text-normal">
                      Want to become a property host?{" "}
                      <Link
                        href="/host-register"
                        className="text-primary font-medium"
                      >
                        Register as Host instead
                      </Link>
                    </p>
                  </div>

                  <form onSubmit={onSubmit} method="POST" className="space-y-6">
                    <div className="w-full">
                      <PopupMessage messageShowOn={"userRegister"} />
                    </div>

                    {/* Personal Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <InputElement
                          title="Full Name"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          placeholder="Enter your full name"
                          error={errors.fullName || ""}
                          onChange={handleChange}
                          onBlur={() => validateField("fullName")}
                          isRequired
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputElement
                          title="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          placeholder="Enter your email"
                          error={errors.email || ""}
                          onChange={handleChange}
                          onBlur={() => validateField("email")}
                          isRequired
                        />
                        <InputElement
                          title="Phone Number"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          placeholder="Enter phone number"
                          error={errors.phone || ""}
                          onChange={handleChange}
                          onBlur={() => validateField("phone")}
                          isRequired
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputElement
                          title="Date of Birth"
                          name="dob"
                          type="date"
                          value={formData.dob}
                          placeholder=""
                          error={errors.dob || ""}
                          onChange={handleChange}
                          onBlur={() => validateField("dob")}
                          isRequired
                          max={
                            new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 18
                              )
                            )
                              .toISOString()
                              .split("T")[0]
                          }
                        />
                        <SelectElement
                          title="Gender"
                          name="gender"
                          value={formData.gender}
                          options={genderOptions}
                          error={errors.gender || null}
                          onChange={(value) =>
                            handleSelectChange("gender", value || "")
                          }
                          onBlur={() => validateField("gender")}
                          isRequired
                        />
                      </div>
                    </div>

                    {/* Status Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                        Status Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectElement
                          title="Occupation Status"
                          name="occupationStatus"
                          value={formData.occupationStatus}
                          options={occupationOptions}
                          error={errors.occupationStatus || null}
                          onChange={(value) =>
                            handleSelectChange("occupationStatus", value || "")
                          }
                          onBlur={() => validateField("occupationStatus")}
                          isRequired
                        />
                        <SelectElement
                          title="Marital Status"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          options={maritalStatusOptions}
                          error={errors.maritalStatus || null}
                          onChange={(value) =>
                            handleSelectChange("maritalStatus", value || "")
                          }
                          onBlur={() => validateField("maritalStatus")}
                          isRequired
                        />
                      </div>
                    </div>

                    {/* Security Section */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                        Security
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <InputElement
                            title="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            placeholder="Create a password"
                            error={errors.password || null}
                            onChange={handleChange}
                            onBlur={() => validateField("password")}
                            isRequired
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-[39px] text-gray-400 hover:text-gray-600"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <AiOutlineEyeInvisible className="w-5 h-5" />
                            ) : (
                              <AiOutlineEye className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        <div className="relative">
                          <InputElement
                            title="Confirm Password"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            placeholder="Confirm your password"
                            error={errors.confirmPassword || null}
                            onChange={handleChange}
                            onBlur={() => validateField("confirmPassword")}
                            isRequired
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-[39px] text-gray-400 hover:text-gray-600"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {showConfirmPassword ? (
                              <AiOutlineEyeInvisible className="w-5 h-5" />
                            ) : (
                              <AiOutlineEye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Terms and Submit Section */}
                    <div className="space-y-4">
                      <CheckboxElement
                        title="I agree to the Terms and Conditions"
                        name="termsAgreed"
                        value={formData.termsAgreed}
                        error={errors.termsAgreed || null}
                        onChange={handleChange}
                        onBlur={() => validateField("termsAgreed")}
                        isRequired
                      />

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer bg-primary hover:bg-[#4338ca] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </button>
                    </div>
                  </form>

                  {/* Additional Links */}
                  <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                    <p className="text-normal">
                      Already have an account?{" "}
                      <Link href="/login" className="text-primary font-medium">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default function Register() {
  return (
    <Suspense fallback={<Spinner />}>
      <RegisterComponent />
    </Suspense>
  );
}
