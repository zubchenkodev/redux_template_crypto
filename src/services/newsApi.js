import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
    'X-RapidAPI-Key': '535d504b88msh8c0b3fdfa076bb6p153e0cjsn083ea6de406b',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1';


const createRequest = (url) => ({ url, headers: newsApiHeaders });

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl }), // Configure the base query with the base URL
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => createRequest(`/theguardian`), // Define a query for fetching data
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;