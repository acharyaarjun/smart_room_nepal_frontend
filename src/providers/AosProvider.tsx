"use client";
import { useEffect } from "react";
import AOS from "aos";

/**
 * AOSProvider component initializes the AOS (Animate On Scroll) library
 * to enable scroll animations in the application.
 * * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element} - The children wrapped in the AOSProvider.
 * @example
 * <AOSProvider>
 *   <YourComponent />
 * </AOSProvider>
 */
const AOSProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return <>{children}</>;
};

export default AOSProvider;
