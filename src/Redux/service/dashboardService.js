import { apiService } from "../apiService";


export const dashboardService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    dashboardData: builder.query({
      query: () => ({
        url: `/dash-board`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),
    adminDashboardData: builder.query({
      query: () => ({
        url: `/dash-board/admin`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),
  }),
});

export const { useDashboardDataQuery, useAdminDashboardDataQuery } =
  dashboardService;



//1️⃣ apiService → base API
//2️⃣ injectEndpoints → নতুন endpoint যোগ
//3️⃣ builder.query → GET request
//4️⃣ transformResponse → clean data
//5️⃣ auto-generated hook → component এ ব্যবহার