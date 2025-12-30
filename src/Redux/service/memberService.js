import { apiService } from "../apiService";

export const memberService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // =======================
    // GET MEMBER LIST
    // =======================
    getMember: builder.query({
      query: () => ({
        url: "member",
        method: "GET",
      }),
    }),

    // =======================
    // CREATE MEMBER (FAST CACHE UPDATE)
    // =======================
    createMember: builder.mutation({
      query: (postBody) => ({
        url: "member",
        method: "POST",
        body: postBody,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        // console.log(postBody)
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiService.util.updateQueryData("getMember", undefined, (draft) => {
              //  console.log(JSON.stringify(draft));
              draft?.data?.data?.push(data?.data?.member);
            })
          );
        } catch (error) {
          console.log("Create member error:", error);
        }
      },
    }),

    // =======================
    // UPDATE MEMBER (No Cache Update Needed unless you want it)
    // =======================
    updateMember: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `member/${id}`,
        method: "PUT",
        body: postBody,
      }),
    }),

    // =======================
    // DELETE MEMBER (OPTIMISTIC DELETE — INSTANT REMOVE)
    // =======================
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `member/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic UI update
        const patch = dispatch(
          apiService.util.updateQueryData("getMember", undefined, (draft) => {
            const members = draft?.data?.data;
            if (!members) return;
            const index = members.findIndex((item) => item._id === id);
            if (index !== -1) members.splice(index, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Delete Error →", error);

          // Undo if API fails
          patch.undo();
        }
      },
    }),
  }),
});

// Export hooks
export const {
  useGetMemberQuery,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = memberService;
