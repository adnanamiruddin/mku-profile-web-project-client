import privateClient from "../clients/private.client";
import publicClient from "../clients/public.client";

const authEndpoint = {
  createToken: "/auth/create-token",
  login: "/auth/login",
  profile: "/auth/profile",
};

const authApi = {
  createToken: async () => {
    try {
      const response = await publicClient.post(authEndpoint.createToken, {
        email: process.env.NEXT_PUBLIC_TOKEN_EMAIL,
        password: process.env.NEXT_PUBLIC_TOKEN_PW,
      });
      if (response.token) {
        localStorage.setItem("actkn", response.token);
        return response.token;
      }
    } catch (error) {
      return { error };
    }
  },

  loginUser: async ({ username, password }) => {
    try {
      const response = await privateClient.post(authEndpoint.login, {
        username,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getProfile: async () => {
    try {
      const response = await privateClient.get(authEndpoint.profile);
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default authApi;
