import axios from 'axios';

export const employeesApi = axios.create({
	baseURL: 'http://localhost:3333/',
});

export const newsApi = axios.create({
	baseURL: 'https://newsapi.org/v2/',
	params: {
		apiKey: process.env.NEWS_API_KEY,
	},
});
