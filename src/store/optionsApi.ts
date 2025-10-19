import { api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOptions: build.query<GetOptionsApiResponse, GetOptionsApiArg>({
      query: () => ({ url: `/options/for/select` }),
    }),
    postSelectedOption: build.mutation<
      PostSelectedOptionApiResponse,
      PostSelectedOptionApiArg
    >({
      query: (queryArg) => ({
        url: `/selected/option`,
        method: "POST",
        body: queryArg.selectedOption,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetOptionsApiResponse = /** status 200 OK */ Option[];
export type GetOptionsApiArg = void;
export type PostSelectedOptionApiResponse = /** status 200 OK */ ServerMessage;
export type PostSelectedOptionApiArg = {
  selectedOption: SelectedOption;
};
export type Option = {
  name: string;
  value: string;
};
export type ServerMessage = {
  message?: string;
};
export type SelectedOption = {
  value: string;
};
export const { useGetOptionsQuery, usePostSelectedOptionMutation } =
  injectedRtkApi;
