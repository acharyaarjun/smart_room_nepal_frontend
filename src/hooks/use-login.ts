"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { signout } from "@/services/authService";
import { login } from "@/services/guestService";
import { useDispatch } from "react-redux";
import { logout, setAuth } from "@/redux/features/auth/authSlice";
import { setMessage } from "@/redux/features/common/popupMessageSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Login } from "@/types/auth/guest";
import { User } from "@/types/auth/user";
import { clearSecureItems, setItemSecurely } from "@/utils/storageUtil";

const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required!");
    } else {
      setEmailError(null);
    }
  };
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required!");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters!");
    } else {
      setPasswordError(null);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateEmail();
    validatePassword();

    if (email && password && !emailError && !passwordError) {
      setIsLoading(true);
      try {
        const response = await login(formData);

        const accessToken: string = response.data.accessToken;
        setItemSecurely("accessToken", accessToken);

        const user: User = response.data.user;
        dispatch(setAuth({ user }));
        const userData = JSON.stringify(user);
        setItemSecurely("user", userData);

        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          if (user.role === "admin" || user.role === "user") {
            router.push("/dashboard");
          }
        }
      } catch (error: any) {
        dispatch(
          setMessage({
            message: error.response.data?.message || "Something went wrong",
            type: "error",
            showOn: "login",
          })
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signout();
      dispatch(logout());
      clearSecureItems(["accessToken", "user"]);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    router,
    email,
    password,
    isLoading,
    handleChange,
    formData,
    togglePasswordVisibility,
    emailError,
    passwordError,
    showPassword,
    validateEmail,
    validatePassword,
    handleLogout,
    onSubmit,
  };
};

export default useLogin;
