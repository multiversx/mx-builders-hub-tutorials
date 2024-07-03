import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { REHYDRATE } from "redux-persist";

const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig, unknown, unknown> => async (props) => {
    const { url, method, data, params, baseURL, validateStatus } = props;

    try {
      const result = await axios({
        url,
        method,
        data,
        params,
        baseURL,
        validateStatus,
        headers: {
          Authorization: `Bearer ${""}`,
        },
      });

      if (result.data.error || !result.status.toString().startsWith("2")) {
        if (
          result.status.toString() === "403" ||
          result.status.toString() === "401"
        ) {
          localStorage.removeItem("jwtToken");
          location.reload();
        }

        throw {
          response: {
            message: result.data.message,
            status: result.data.statusCode,
          },
        };
      }

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const RootApi = createApi({
  reducerPath: "API",
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});
