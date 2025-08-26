import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

/**
 * The `rootReducer` combines all the reducers in the application.
 * In this case, it combines the `authReducer` for authentication-related state.
 * You can add more reducers as your application grows.
 *
 * @example
 * const rootReducer = combineReducers({
 *   auth: authReducer,
 *   // other reducers...
 * });
 */
const rootReducer = combineReducers({
  auth: authReducer,
});

/**
 * Creates and configures the Redux store.
 *
 * This function sets up the Redux store with the combined reducer (`rootReducer`)
 * and enables Redux DevTools in development mode.
 *
 * @example
 * const store = makeStore();
 * store.dispatch(someAction());
 */
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in non-production environments
  });
};

/**
 * The `AppStore` type represents the Redux store.
 * It is created using the `makeStore` function.
 * This type is used to define the shape of the store in the application.
 *
 * @example
 * const store: AppStore = makeStore();
 * store.dispatch(someAction());
 */
export type AppStore = ReturnType<typeof makeStore>;

/**
 * The `AppDispatch` type represents the dispatch function of the Redux store.
 * This type is inferred from the `dispatch` method of the `AppStore`.
 * It is used to type the dispatch function in components and hooks.
 *
 * @example
 * const dispatch: AppDispatch = useDispatch();
 * dispatch(someAction());
 */
export type AppDispatch = AppStore["dispatch"];

/**
 * The `RootState` type represents the shape of the entire Redux store state.
 * It is inferred from the `getState` method of the `AppStore`.
 * This type is used to type the state in selectors and components.
 *
 * @example
 * const state: RootState = useSelector((state) => state);
 * console.log(state.auth.isAuthenticated);
 */
export type RootState = ReturnType<AppStore["getState"]>;
