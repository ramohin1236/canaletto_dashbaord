import baseApis from "../baseApis";

const profileApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<any, void>({
      query: () => ({
        url: '/user/get-my-profile',
        method: 'GET'
      })
    }),

  })
})

export const {
  useGetProfileQuery
} = profileApis
