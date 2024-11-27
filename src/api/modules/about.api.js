import privateClient from "../clients/private.client";

const aboutEndpoint = {
  profile: "/about/profile",
};

const aboutApi = {
  profile: {
    getProfile: async () => {
      try {
        const response = await privateClient.get(aboutEndpoint.profile);
        return { response };
      } catch (error) {
        return { error };
      }
    },

    saveProfile: async ({ content }) => {
      try {
        const response = await privateClient.post(aboutEndpoint.profile, {
          content,
        });
        return { response };
      } catch (error) {
        return { error };
      }
    },
  },

  lecturer: {},
};

export default aboutApi;
