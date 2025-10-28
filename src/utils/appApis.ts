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
  districts: {
    all: `/api/${API_VERSION}/districts`,
  },
  amenities: {
    all: `/api/${API_VERSION}/amenities`,
  },
  membershipType: {
    all: `/api/${API_VERSION}/membership-types`,
    getSingle: (slug: string) => `/api/${API_VERSION}/membership-types/${slug}`,
  },
  membership: {
    create: `/api/${API_VERSION}/membership`,
    getPayment: `/api/${API_VERSION}/membership/payments`,
  },
  rooms: {
    create: `/api/${API_VERSION}/rooms`,
    getByHost: `/api/${API_VERSION}/rooms/host`,
    getSingleForHost: (slug: string) => `/api/${API_VERSION}/rooms/${slug}`,
    update: (slug: string) => `/api/${API_VERSION}/rooms/${slug}`,
    delete: (slug: string) => `/api/${API_VERSION}/rooms/${slug}`,

    // for normal users
    get: `/api/${API_VERSION}/rooms`,
    getSingleForUser: (slug: string) =>
      `/api/${API_VERSION}/rooms/${slug}/user`,
    wishlist: (slug: string) => `/api/${API_VERSION}/rooms/wishlist/${slug}`,

    media: {
      create: (slug: string) => `/api/${API_VERSION}/rooms/medias/${slug}`,
      get: (slug: string) => `/api/${API_VERSION}/rooms/medias/${slug}`,
      delete: (mediaId: number) =>
        `/api/${API_VERSION}/rooms/medias/${mediaId}`,
    },
    amenities: {
      get: (slug: string) => `/api/${API_VERSION}/rooms/amenities/${slug}`,
      create: (slug: string) => `/api/${API_VERSION}/rooms/amenities/${slug}`,
      delete: (amenityId: number) =>
        `/api/${API_VERSION}/rooms/amenities/${amenityId}`,
      update: (amenityId: number) =>
        `/api/${API_VERSION}/rooms/amenities/${amenityId}`,
    },
    requests: {
      create: (slug: string) => `/api/${API_VERSION}/rooms/requests/${slug}`, // for user
      getByUser: `/api/${API_VERSION}/rooms/requests`, // for user
      getByHost: `/api/${API_VERSION}/rooms/requests/host`, // for host
      update: (token: string) => `/api/${API_VERSION}/rooms/requests/${token}`, // for both host & user
    },
    reviews: {
      create: (roomRequestId: number) =>
        `/api/${API_VERSION}/rooms/reviews/${roomRequestId}`, // for user
      getByUser: `/api/${API_VERSION}/rooms/reviews/user`, // for user
      getByHost: `/api/${API_VERSION}/rooms/reviews/host`, // for host
      get: `/api/${API_VERSION}/rooms/reviews`, // for client
      update: (reviewId: number) =>
        `/api/${API_VERSION}/rooms/reviews/${reviewId}`, // for user
      delete: (reviewId: number) =>
        `/api/${API_VERSION}/rooms/reviews/${reviewId}`, // for user
    },
  },
};

export default AppApis;
