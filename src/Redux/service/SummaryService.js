import { apiService } from "../apiService";


export const summarryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
      getSummarry: builder.query({
        query: () => ({
          url: "/summary",
          method: "GET",
        }),
      }),
      }),
      })
      
      

export const{useGetSummarryQuery}=summarryService;