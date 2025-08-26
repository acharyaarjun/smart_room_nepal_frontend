"use client";
import { AppStore, makeStore } from "@/redux/store";
import React, { JSX, ReactNode, useRef } from "react";
import { Provider } from "react-redux";

type StoreProvider = JSX.Element;

/**
 * StoreProvider component wraps the application with the Redux Provider.
 * It initializes the Redux store and provides it to the entire application.
 *
 * @param {ReactNode} children - The child components to be rendered within the provider.
 * @returns {JSX.Element} - The Provider component with the Redux store.
 *
 * @example
 * <StoreProvider>
 *   <App />
 * </StoreProvider>
 */

const StoreProvider = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
