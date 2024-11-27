import privateClient from "../clients/private.client";

const facilitiesEndpoint = {
  facilities: "/facilities",
};

const facilitiesApi = {
  getFacilities: async () => {
    try {
      const response = await privateClient.get(facilitiesEndpoint.facilities);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  saveFacilities: async ({ content }) => {
    try {
      const response = await privateClient.post(facilitiesEndpoint.facilities, {
        content,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default facilitiesApi;
