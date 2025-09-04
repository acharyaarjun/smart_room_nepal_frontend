"use client";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  InputElement,
  SelectElement,
  CheckboxElement,
} from "@/components/common/form-element";
import Link from "next/link";
import Image from "next/image";
import signUpBackground from "@/assets/images/backgrounds/signin.svg";

export default function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    gender: "",
    occupationStatus: "",
    maritalStatus: "",
    termsAgreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    console.log("Registration submitted:", formData);
  };

  const genderOptions = [
    { value: "", label: "Select gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" },
  ];

  const occupationOptions = [
    { value: "", label: "Select occupation status" },
    { value: "employed", label: "Employed" },
    { value: "student", label: "Student" },
    { value: "self_employed", label: "Self-employed" },
    { value: "unemployed", label: "Unemployed" },
    { value: "retired", label: "Retired" },
  ];

  const maritalStatusOptions = [
    { value: "", label: "Select marital status" },
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  return (
    <section id="register" className="w-full py-12">
      <div className="container">
        <div className="flex justify-center items-center w-full min-h-[calc(100vh-170px)]">
          <div className="flex shadow-custom rounded-2xl overflow-hidden bg-light dark:bg-dropdown w-full">
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
                    Create Account
                  </h2>
                  <p className="mt-2 text-normal">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#5143d9] hover:text-[#4338ca] font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputElement
                      title="Full Name"
                      name="fullname"
                      type="text"
                      value={formData.fullname}
                      placeholder="Enter your full name"
                      error={null}
                      onChange={(e) =>
                        setFormData({ ...formData, fullname: e.target.value })
                      }
                      onBlur={() => console.log("Full name blurred")}
                      isRequired
                    />
                    <InputElement
                      title="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      placeholder="Enter your email"
                      error={null}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onBlur={() => console.log("Email blurred")}
                      isRequired
                    />

                    <InputElement
                      title="Username"
                      name="username"
                      type="text"
                      value={formData.username}
                      placeholder="Choose a username"
                      error={null}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      onBlur={() => console.log("Username blurred")}
                      isRequired
                    />
                    <InputElement
                      title="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      placeholder="Enter phone number"
                      error={null}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      onBlur={() => console.log("Phone blurred")}
                    />

                    <InputElement
                      title="Date of Birth"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      placeholder=""
                      error={null}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                      onBlur={() => console.log("DOB blurred")}
                    />
                    <SelectElement
                      title="Gender"
                      name="gender"
                      value={formData.gender}
                      options={genderOptions}
                      error={null}
                      onChange={() => setFormData({ ...formData, gender: "" })}
                      onBlur={() => console.log("Gender blurred")}
                    />

                    <SelectElement
                      title="Occupation Status"
                      name="occupationStatus"
                      value={formData.occupationStatus}
                      options={occupationOptions}
                      error={null}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          occupationStatus: "",
                        })
                      }
                      onBlur={() => console.log("Occupation blurred")}
                    />
                    <SelectElement
                      title="Marital Status"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      options={maritalStatusOptions}
                      error={null}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          maritalStatus: "",
                        })
                      }
                      onBlur={() => console.log("Marital status blurred")}
                    />

                    <div className="relative">
                      <InputElement
                        title="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        placeholder="Create a password"
                        error={null}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        onBlur={() => console.log("Password blurred")}
                        isRequired
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
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
                        error={null}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        onBlur={() => console.log("Confirm password blurred")}
                        isRequired
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <AiOutlineEyeInvisible className="w-5 h-5" />
                        ) : (
                          <AiOutlineEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <CheckboxElement
                    title="I agree to the Terms and Conditions"
                    name="termsAgreed"
                    value={formData.termsAgreed}
                    error={null}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        termsAgreed: e.target.checked,
                      })
                    }
                    onBlur={() => console.log("Terms checkbox blurred")}
                    isRequired
                  />

                  <button
                    type="button"
                    onClick={handleRegister}
                    className="w-full cursor-pointer bg-[#5143d9] hover:bg-[#4338ca] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
