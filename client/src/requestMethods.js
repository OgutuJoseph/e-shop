import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2ZkNDUzMjBhNTFjZjljMjE1NmY5ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NzgxOTcyMywiZXhwIjoxNjY4MDc4OTIzfQ.y-0HUtCIP5mhuoqNAcJQPYy3k_nfh5024R4K-FsAa04'
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