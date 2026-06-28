import { useSelector } from "react-redux";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default function useApi() {
  const token = useSelector((state: any) => state.login.token);

  const Api = async (values: {
    method: "get" | "post" | "put" | "delete";
    endpoint: string;
    data?: object;
  }) => {
    try {
      if (values.method === "get" || values.method === "delete") {
        const response = await api[values.method](values.endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      } else {
        const response = await api[values.method](
          values.endpoint,
          values.data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  return { Api };
}
