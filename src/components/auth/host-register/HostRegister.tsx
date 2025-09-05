"use client";
import React, { useState } from "react";
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

export default function HostRegister() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    occupationStatus: "",
    maritalStatus: "",
    password: "",
    confirmPassword: "",
    citizenshipDocument: null as File[] | null,
    termsAgreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleHostRegister = () => {
    // Create FormData for file uploads
    const registrationData = new FormData();

    // Add text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "citizenshipDocument" && value !== null) {
        registrationData.append(key, value.toString());
      }
    });

    // Add citizenship document
    if (
      formData.citizenshipDocument &&
      formData.citizenshipDocument.length > 0
    ) {
      // Append each file if multiple are allowed
      formData.citizenshipDocument.forEach((file, index) => {
        registrationData.append(`citizenshipDocument[${index}]`, file);
      });
    }

    console.log("Host registration submitted:", formData);
    console.log("FormData prepared for API:", registrationData);
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
    <section id="host-register" className="w-full py-8">
      <div className="container">
        <div className="flex justify-center items-start w-full min-h-screen">
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
                    <Link href="/register" className="text-primary font-medium">
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

                {/* Main Form Content */}
                <div className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputElement
                        title="Full Name"
                        name="fullname"
                        type="text"
                        value={formData.fullname}
                        placeholder="Enter your full name"
                        error={null}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fullname: e.target.value,
                          })
                        }
                        onBlur={() => console.log("Full name blurred")}
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
                          setFormData({
                            ...formData,
                            username: e.target.value,
                          })
                        }
                        onBlur={() => console.log("Username blurred")}
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
                        error={null}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        onBlur={() => console.log("Email blurred")}
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
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        onBlur={() => console.log("Phone blurred")}
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
                        error={null}
                        onChange={(e) =>
                          setFormData({ ...formData, dob: e.target.value })
                        }
                        onBlur={() => console.log("DOB blurred")}
                        isRequired
                      />
                      <SelectElement
                        title="Gender"
                        name="gender"
                        value={formData.gender}
                        options={genderOptions}
                        error={null}
                        onChange={() =>
                          setFormData({ ...formData, gender: "" })
                        }
                        onBlur={() => console.log("Gender blurred")}
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
                        error={null}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            occupationStatus: "",
                          })
                        }
                        onBlur={() => console.log("Occupation blurred")}
                        isRequired
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
                          error={null}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          onBlur={() => console.log("Password blurred")}
                          isRequired
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-[39px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                          className="absolute right-3 top-[39px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                      Document Verification
                    </h3>
                    <FileSelectElement
                      title="Citizenship / NID / Voter Card"
                      name="citizenshipDocument"
                      value={formData.citizenshipDocument}
                      placeholder="Upload your citizenship document, national ID, or voter card"
                      error={null}
                      onChange={(files) =>
                        setFormData({
                          ...formData,
                          citizenshipDocument: files,
                        })
                      }
                      onBlur={() => console.log("Citizenship document blurred")}
                      multiple={false}
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      maxFiles={1}
                      maxSize={10 * 1024 * 1024}
                      heightClassName="h-full"
                      widthClassName="w-full"
                      isRequired
                    />
                  </div>

                  {/* Terms and Submit Section (Full Width) */}
                  <div className="space-y-4">
                    <CheckboxElement
                      title="I agree to the Terms and Conditions and Host Agreement"
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
                      onClick={handleHostRegister}
                      className="w-full cursor-pointer bg-primary hover:bg-[#4338ca] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                    >
                      Register as Host
                    </button>
                  </div>
                </div>

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
        </div>
      </div>
    </section>
  );
}
