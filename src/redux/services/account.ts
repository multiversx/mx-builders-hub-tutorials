import { identityServiceBaseUrl } from "../../config";
import { RootApi } from "../rootApi";

const accountEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    sendAuthenticationEmail: builder.mutation({
      query: (params) => ({
        baseURL: identityServiceBaseUrl,
        url: `/email-login-init`,
        method: "POST",
        data: { email: params.email },
      }),
    }),

    getAccountAuthToken: builder.query<string, string | undefined>({
      keepUnusedDataFor: 0,
      query: (authToken) => ({
        baseURL: identityServiceBaseUrl,
        url: `/email-login-token`,
        method: "POST",
        data: { authToken },
      }),
    }),
  }),
});

export const {
  useSendAuthenticationEmailMutation,
  useGetAccountAuthTokenQuery,
} = accountEndpoints;
