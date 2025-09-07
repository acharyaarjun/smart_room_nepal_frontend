"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";
import {
  InputElement,
  SelectElement,
  CheckboxElement,
  FileSelectElement,
} from "@/components/common/form-element";
import Link from "next/link";
import Image from "next/image";
import { useHostRegister } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { PopupMessage, Spinner } from "@/components/common";

const HostRegisterComponent = () => {
  const {
    formData,
    isLoading,
    errors,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleSelectChange,
    handleFileChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    validateField,
    onSubmit,
  } = useHostRegister();

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
    <section id="host-register" className="w-full py-8">
      <div className="container">
        <div className="flex justify-center items-start w-full min-h-screen">
          {loading ? (
            <div className="w-full relative z-[2] h-full flex justify-center items-center">
              <Spinner color="text-primary" />
            </div>
          ) : (
            <div className="shadow-custom rounded-2xl overflow-hidden bg-light dark:bg-dropdown w-full max-w-5xl">
              <div className="w-full">
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
                      Host Registration
                    </h2>
                    <p className="mt-2 text-normal">
                      Join as a property host and start earning{" "}
                      <Link
                        href="/register"
                        className="text-primary font-medium"
                      >
                        Register as User instead
                      </Link>
                    </p>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-6">
                    <div className="flex items-start space-x-2">
                      <AiOutlineWarning className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                          Important Notice
                        </h3>
                        <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                          You cannot be both a regular user and a property owner
                          at the same time. Once you register as a host, your
                          account type cannot be changed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={onSubmit} method="POST" className="space-y-6">
                    <div className="w-full">
                      <PopupMessage messageShowOn={"hostRegister"} />
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
                    </div>{" "}
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
                            className="absolute right-3 top-[39px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                            className="absolute right-3 top-[39px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                    {/* Document Verification Section */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                        Document Verification
                      </h3>
                      <FileSelectElement
                        title="Citizenship / NID / Voter Card"
                        name="citizenshipDocument"
                        value={formData.citizenshipDocument}
                        placeholder="Upload your citizenship document, national ID, or voter card"
                        error={errors.citizenshipDocument || null}
                        onChange={handleFileChange}
                        onBlur={() => validateField("citizenshipDocument")}
                        multiple={false}
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        maxFiles={1}
                        maxSize={10 * 1024 * 1024}
                        heightClassName="h-full"
                        widthClassName="w-full"
                        isRequired
                      />
                    </div>
                    {/* Terms and Submit Section */}
                    <div className="space-y-4">
                      <CheckboxElement
                        title="I agree to the Terms and Conditions and Host Agreement"
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
                        {isLoading ? "Creating Account..." : "Register as Host"}
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

export default function HostRegister() {
  return (
    <Suspense fallback={<Spinner />}>
      <HostRegisterComponent />
    </Suspense>
  );
}
