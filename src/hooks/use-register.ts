"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "@/redux/features/common/popupMessageSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { register } from "@/services/guestService";

interface UserRegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  occupationStatus: string;
  maritalStatus: string;
  password: string;
  confirmPassword: string;
  termsAgreed: boolean;
  role: string;
}

const useRegister = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserRegisterFormData>({
    fullName: "",
    email: "",
    role: "user",
    phone: "",
    dob: "",
    gender: "",
    occupationStatus: "",
    maritalStatus: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Validation errors
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserRegisterFormData, string | null>>
  >({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof UserRegisterFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setFormData({
      ...formData,
      [name]: value || "",
    });

    // Clear error when user selects
    if (errors[name as keyof UserRegisterFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validation functions
  const validateField = (fieldName: keyof UserRegisterFormData) => {
    const value = formData[fieldName];
    let error: string | null = null;

    switch (fieldName) {
      case "fullName":
        if (!value) error = "Full name is required!";
        else if ((value as string).length < 2)
          error = "Full name must be at least 2 characters!";
        break;

      case "email":
        if (!value) error = "Email is required!";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string))
          error = "Please enter a valid email address!";
        break;

      case "phone":
        if (!value) error = "Phone number is required!";
        else if (!/^\d{10}$/.test((value as string).replace(/\D/g, "")))
          error = "Please enter a valid 10-digit phone number!";
        break;

      case "dob":
        if (!value) error = "Date of birth is required!";
        else {
          const birthDate = new Date(value as string);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 18) error = "You must be at least 18 years old!";
        }
        break;

      case "gender":
        if (!value) error = "Gender is required!";
        break;

      case "occupationStatus":
        if (!value) error = "Occupation status is required!";
        break;

      case "maritalStatus":
        if (!value) error = "Marital status is required!";
        break;

      case "password":
        if (!value) error = "Password is required!";
        else if ((value as string).length < 8)
          error = "Password must be at least 8 characters!";
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value as string))
          error =
            "Password must contain at least one uppercase letter, one lowercase letter, and one number!";
        break;

      case "confirmPassword":
        if (!value) error = "Confirm password is required!";
        else if (value !== formData.password) error = "Passwords do not match!";
        break;

      case "termsAgreed":
        if (!value) error = "You must agree to the terms and conditions!";
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));

    return !error;
  };

  const validateAllFields = () => {
    const fieldsToValidate: (keyof UserRegisterFormData)[] = [
      "fullName",
      "email",
      "phone",
      "dob",
      "gender",
      "occupationStatus",
      "maritalStatus",
      "password",
      "confirmPassword",
      "termsAgreed",
    ];

    const validationResults = fieldsToValidate.map((field) =>
      validateField(field)
    );
    return validationResults.every((result) => result);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateAllFields()) {
      dispatch(
        setMessage({
          message: "Please fix all errors before submitting!",
          type: "error",
          showOn: "userRegister",
        })
      );
      return;
    }

    setIsLoading(true);
    try {
      // Create user data object (no FormData needed since no file upload)
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        occupationStatus: formData.occupationStatus,
        maritalStatus: formData.maritalStatus,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        termsAgreed: formData.termsAgreed,
      };

      await register(registrationData);

      toast.success("Registration successful! Welcome aboard!", {
        id: "toast",
      });

      router.push("/login");
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        // Handle field-specific validation errors from backend
        if (error.response.data.errors) {
          const backendErrors = error.response.data.errors;

          backendErrors.map((errorItem: any) => {
            const key = Object.keys(errorItem)[0];
            const value = errorItem[key];

            // Set specific field errors
            setErrors((prev) => ({
              ...prev,
              [key]: value,
            }));
          });
        }

        // Show general error message
        const errorMessage =
          error.response.data.message ||
          "Registration failed. Please try again.";

        dispatch(
          setMessage({
            message: errorMessage,
            type: "error",
            showOn: "userRegister",
          })
        );

        toast.error(errorMessage, { id: "toast" });
        return;
      }

      const errorMessage = "Something went wrong. Please try again.";

      dispatch(
        setMessage({
          message: errorMessage,
          type: "error",
          showOn: "userRegister",
        })
      );

      toast.error(errorMessage, { id: "toast" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    router,
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
  };
};

export default useRegister;
