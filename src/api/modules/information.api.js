import privateClient from "../clients/private.client";
import privateClientFile from "../clients/private.client.file";

const informationEndpoint = {
  blogs: "/blogs",
  blogsByPage: ({ page }) => `/blogs?page=${page}`,
  blogsUploadImage: "/blogs/upload-image",
  blogsWithStatus1: "/blogs?status=1",
  blogsBySlug: ({ slug }) => `/blogs/${slug}`,
  blogsById: ({ blogId }) => `/blogs/${blogId}`,

  map: "/about/map",
};

const informationApi = {
  blog: {
    createBlog: async ({ title, slug, status, author, imageDesc, content }) => {
      try {
        const response = await privateClient.post(informationEndpoint.blogs, {
          title,
          slug,
          status,
          author,
          imageDesc,
          content,
        });
        return { response };
      } catch (error) {
        return { error };
      }
    },
    //
    uploadBlogImage: async ({ slug, image }) => {
      try {
        const formData = new FormData();
        formData.append("slug", slug);
        formData.append("image", image);
        const response = await privateClientFile.post(
          informationEndpoint.blogsUploadImage,
          formData
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },

    getAllBlogs: async ({ page }) => {
      try {
        const response = await privateClient.get(
          informationEndpoint.blogsByPage({ page })
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },
    //
    getBlogBySlug: async ({ slug }) => {
      try {
        const response = await privateClient.get(
          informationEndpoint.blogsBySlug({ slug })
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },
    //
    getPublishedBlogs: async () => {
      try {
        const response = await privateClient.get(
          informationEndpoint.blogsWithStatus1
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },

    updateBlog: async ({
      blogId,
      title,
      slug,
      status,
      author,
      imageDesc,
      content,
    }) => {
      try {
        const response = await privateClient.put(
          informationEndpoint.blogsById({
            blogId,
          }),
          {
            title,
            slug,
            status,
            author,
            imageDesc,
            content,
          }
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },

    deleteBlog: async ({ blogId }) => {
      try {
        const response = await privateClient.delete(
          informationEndpoint.blogsById({ blogId })
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },
  },

  map: {
    getMap: async () => {
      try {
        const response = await privateClient.get(informationEndpoint.map);
        return { response };
      } catch (error) {
        return { error };
      }
    },

    saveMap: async ({ image }) => {
      try {
        const formData = new FormData();
        formData.append("image", image);
        const response = await privateClientFile.post(
          informationEndpoint.map,
          formData
        );
        return { response };
      } catch (error) {
        return { error };
      }
    },
  },
};

export default informationApi;
