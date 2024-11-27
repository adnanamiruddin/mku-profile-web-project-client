import privateClient from "../clients/private.client";

const workProgramEndpoint = {
  workPlan: "/work-plan",
};

const workProgramApi = {
  getWorkProgram: async () => {
    try {
      const response = await privateClient.get(workProgramEndpoint.workPlan);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  saveWorkProgram: async ({ content }) => {
    try {
      const response = await privateClient.post(workProgramEndpoint.workPlan, {
        content,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default workProgramApi;
