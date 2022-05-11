import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IAccountData} from "../models/accountData.interface";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/mecmartini/fc7b0d380ab8e63504271f4951312401/raw/98e714e1daa61f03c67f061d5e5dee53b86a35ae",
  }),
  endpoints: (build) => ({
    getAccounts: build.query<Array<IAccountData>, undefined>({
      query: () => ({
        url: "/data_ex.json",
        method: "GET",
        withCredentials: true,
      }),
    }),
  }),
});

export const { useGetAccountsQuery } = accountApi;
