/**
 * @description AppApis is a collection of all the API endpoints used in the app.
 * @example
 * import AppApis from `@/utils/appApis`;
 * axiosInstance.get(AppApis.auth.login);
 */

const API_VERSION = "v1";

const AppApis = {
  auth: {
    login: `/api/${API_VERSION}/auth/login`,
    register: `/api/${API_VERSION}/auth/register`,
    refreshToken: `/api/${API_VERSION}/auth/refresh-access-token`,
    resendEmailVerification: `/api/${API_VERSION}/auth/resend-email-verification`,
    verifyEmail: `/api/${API_VERSION}/auth/verify-email`,
    logout: `/api/${API_VERSION}/auth/logout`,
    logoutAll: `/api/${API_VERSION}/auth/logout-all`,
    googleLogin: `/api/${API_VERSION}/auth/google`,
  },
  passwordReset: {
    forgotPassword: `/api/${API_VERSION}/password-reset/forgot-password`,
    verifyOTP: `/api/${API_VERSION}/password-reset/verify-otp`,
    resetPassword: `/api/${API_VERSION}/password-reset/reset-password`,
    resendPasswordResetOTP: `/api/${API_VERSION}/password-reset/forogt-password`,
  },
  users: {
    me: `/api/${API_VERSION}/users/me`,
    changePassword: `/api/${API_VERSION}/users/change-password`,
    updateProfile: `/api/${API_VERSION}/users/profile`,
  },
};

export default AppApis;
