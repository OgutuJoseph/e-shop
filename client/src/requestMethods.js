import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2ZkYTAxMGI1N2E1MGRiYWZmOGI4MCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjcyMTk1MTl9.WnXa5LMu3E1ONElPXpYkYpze9YqWs5v96uRD34ZeF30'
const TOKEN = accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        token: `Bearer ${TOKEN}`
    }
})