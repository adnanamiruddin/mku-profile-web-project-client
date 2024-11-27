import privateClient from "../clients/private.client";
import privateClientFile from "../clients/private.client.file";

const subjectEndpoint = {
  subjects: "/subjects",
  subjectsUploadRps: "/subjects/upload-rps",
  subjectsUploadMonitoring: "/subjects/upload-monitoring",
  subjectsUploadSchedule: "/subjects/upload-schedule",
  subjectsUploadLecturer: "/subjects/upload-lecturer",
  subjectsUploadEvaluation: "/subjects/upload-evaluation",
  subjectBySlug: ({ slug }) => `/subjects/${slug}`,
  subjectById: ({ subjectId }) => `/subjects/${subjectId}`,
};

const subjectApi = {
  createSubject: async ({ name, slug, category, description }) => {
    try {
      const response = await privateClient.post(subjectEndpoint.subjects, {
        nama: name,
        slug,
        tipe: category,
        deskripsi: description,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  //
  uploadSubjectRps: async ({ slug, rpsDocument }) => {
    try {
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("rpsDocument", rpsDocument);
      const response = await privateClientFile.post(
        subjectEndpoint.subjectsUploadRps,
        formData
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
  //
  uploadSubjectMonitoring: async ({ slug, monitoringDocument }) => {
    try {
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("monitoringDocument", monitoringDocument);
      const response = await privateClientFile.post(
        subjectEndpoint.subjectsUploadMonitoring,
        formData
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
  //
  uploadSubjectSchedule: async ({ slug, scheduleDocument }) => {
    try {
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("scheduleDocument", scheduleDocument);
      const response = await privateClientFile.post(
        subjectEndpoint.subjectsUploadSchedule,
        formData
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
  //
  uploadSubjectLecturer: async ({ slug, lecturerDocument }) => {
    try {
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("lecturerDocument", lecturerDocument);
      const response = await privateClientFile.post(
        subjectEndpoint.subjectsUploadLecturer,
        formData
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
  //
  uploadSubjectEvaluation: async ({ slug, evaluationDocument }) => {
    try {
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("evaluationDocument", evaluationDocument);
      const response = await privateClientFile.post(
        subjectEndpoint.subjectsUploadEvaluation,
        formData
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getAllSubjects: async () => {
    try {
      const response = await privateClient.get(subjectEndpoint.subjects);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  //
  getSubjectBySlug: async ({ slug }) => {
    try {
      const response = await privateClient.get(
        subjectEndpoint.subjectBySlug({ slug })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  updateSubject: async ({ subjectId, name, category, description }) => {
    try {
      const response = await privateClient.put(
        subjectEndpoint.subjectById({ subjectId }),
        {
          nama: name,
          tipe: category,
          deskripsi: description,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteSubject: async ({ subjectId }) => {
    try {
      const response = await privateClient.delete(
        subjectEndpoint.subjectById({ subjectId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default subjectApi;
