import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2ZkNDUzMjBhNTFjZjljMjE1NmY5ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjY4MDg4NSwiZXhwIjoxNjY2OTQwMDg1fQ.lhPY18LkzH3M4TjeAinbvx3mx1zwpM_jU8TsUCKTCgo'

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        token: `Bearer ${TOKEN}`
    }
})