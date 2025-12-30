import { apiService } from "../apiService";



//👉 builder দিয়ে আপনি endpoint বানান:
//builder.query() → GET
//builder.mutation() → POST / PUT / DELETE

 export const membersService = apiService.injectEndpoints({
       endpoints:(builder)=>({
        getMembers:builder.query({
          query:()=>({
             url:"member",
             method:'GET'
          })  
        }),
        membersCreate:builder.mutation({
          query:(postBody)=>({
            url:"member",
            method:"POST",
            body:postBody
          }),
// =======================
    // CREATE MEMBER (FAST CACHE UPDATE)
    // =======================
           async onQueryStarted(_arg, {dispatch, queryFulfilled}){
            try{
              const {data} = await queryFulfilled
              dispatch(
                apiService.util.updateQueryData("getMembers", undefined, (draft)=>{
                    draft?.data?.data?.push(data?.data?.member)
                    // console.log(JSON.stringify(draft))
                })
              )
            }catch(error){
              console.log("Crater member error", error)
            }
           } 
    }),
deleteMembers: builder.mutation({
  query: (id) => ({
    url: `member/${id}`,
    method: "DELETE",
  }),
  async onQueryStarted(id, { dispatch, queryFulfilled }) {
    try {
      await queryFulfilled;

      dispatch(
        apiService.util.updateQueryData("getMembers", undefined, (draft) => {
          const membersArray = draft?.data?.data;
          if (!membersArray) return;

          const index = membersArray.findIndex((item) => item._id === id);
          if (index !== -1) membersArray.splice(index, 1);
        })
      );
    } catch (error) {
      console.log("Delete Member error", error);
    }
  },
}),


        })
       })


export const{useGetMembersQuery, useMembersCreateMutation, useDeleteMembersMutation} = membersService