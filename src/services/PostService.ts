import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPost} from "../models/IPost";

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/'
    }),
    endpoints: (build) => ({
        // query() - получение данных с сервера (get запрос)
        // mutation() - изменение данных (post/put запрос)
    fetchAllPosts: build.query<IPost[], number>({
        query: (limit: number = 5) => ({
            url: `posts`,
            params: {
                _limit: limit
            }
        })
    })
})
})