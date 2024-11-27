import privateClient from "../clients/private.client";
import publicClient from "../clients/public.client";

const authEndpoint = {
  createToken: "/auth/create-token",
  login: "/auth/login",
  profile: "/auth/profile",
};

const authApi = {
  createToken: async ({ username, password }) => {
    try {
      const response = await publicClient.post(authEndpoint.createToken, {
        account: username,
        password,
      });
      if (response.accessToken) {
        localStorage.setItem("actkn", response.accessToken);
        return response;
      }
    } catch (error) {
      return { error };
    }
  },

  loginUser: async ({ username, password }) => {
    try {
      const response = await privateClient.post(authEndpoint.login, {
        account: username,
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
