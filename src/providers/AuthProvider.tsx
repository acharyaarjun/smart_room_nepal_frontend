"use client";
import { setAuth } from "@/redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { Spinner } from "@/components/common";
import { User } from "@/types/auth/user";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { getItemSecurelyAsync } from "@/utils/storageUtil";

const AuthProvider = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: string[];
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        const user: string | null =
          (await getItemSecurelyAsync("user")) || null;
        if (!user) {
          router.push("/");
          return;
        }

        if (user) {
          const parsedUser: User = JSON.parse(user);
          const availableCreditsString =
            (await getItemSecurelyAsync("availableCredits")) || "0";
          const availableCredits = parseInt(
            availableCreditsString.toLocaleString(),
            10
          );
          dispatch(setAuth({ user: parsedUser, availableCredits }));
          const userRole = parsedUser?.role as string;

          if (roles && roles.length > 0 && !roles.includes(userRole)) {
            router.push("/unauthorized");
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error getting user:", error);
        router.push("/");
      }
    };

    getUser();
  }, [dispatch, router, roles]);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return (
      <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    );
  }
};

export default AuthProvider;
