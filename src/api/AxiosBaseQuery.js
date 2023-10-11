import api from '../api';

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      console.log(url, method, data, params, headers,"here here")
      const result = await api({ url: baseUrl + url, body: data, method, params, headers });
      return { data: result };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
