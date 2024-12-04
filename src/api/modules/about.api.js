import privateClient from "../clients/private.client";
import privateClientFile from "../clients/private.client.file";

const aboutEndpoint = {
  profile: "/about/profile",

  staff: "/staff",
  staffQueryPage: ({ page }) => `/staff?page=${page}`,
  staffUploadFoto: "/staff/upload-foto",
  staffByNip: ({ nip }) => `/staff/${nip}`,
  staffById: ({ staffId }) => `/staff/${staffId}`,
  searchStaffQueryKeyword: ({ keyword, page }) =>
    `/staff?name=${keyword}&page=${page}`,
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

  lecturer: {
    createLecturerData: async ({ name, nip, position, studyProgram }) => {
      try {
        const response = await privateClient.post(aboutEndpoint.staff, {
          nama: name,
          nip,
          jabatan: position,
          prodi: studyProgram,
        });
        return { response };
      } catch (error) {
        return { error };
      }
    },
    //
    uploadLecturerPhoto: async ({ nip, image }) => {
      try {
        const formData = new FormData();
        formData.append("nip", nip);
        formData.append("image", image);
        const response = await privateClientFile.post(
          aboutEndpoint.staffUploadFoto,
          formData
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },

    getAllLecturers: async ({ page }) => {
      try {
        const response = await privateClient.get(
          aboutEndpoint.staffQueryPage({ page })
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },
    //
    getLecturerByNip: async ({ nip }) => {
      try {
        const response = await privateClient.get(
          aboutEndpoint.staffByNip({ nip })
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },
    //
    searchLecturer: async ({ keyword, page }) => {
      try {
        const response = await privateClient.get(
          aboutEndpoint.searchStaffQueryKeyword({ keyword, page })
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },

    updateLecturerData: async ({
      lecturerId,
      name,
      nip,
      position,
      studyProgram,
    }) => {
      try {
        const response = await privateClient.put(
          aboutEndpoint.staffById({ staffId: lecturerId }),
          {
            nama: name,
            nip,
            jabatan: position,
            prodi: studyProgram,
          }
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },

    deleteLecturerData: async ({ lecturerId }) => {
      try {
        const response = await privateClient.delete(
          aboutEndpoint.staffById({ staffId: lecturerId })
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },
  },
};

export default aboutApi;
