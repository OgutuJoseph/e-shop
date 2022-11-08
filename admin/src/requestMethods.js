import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

/** without combineReducers */
// console.log('current admin: ', JSON.parse(JSON.parse(localStorage.getItem('persist:root')).currentAdmin));
// // console.log('token: ', JSON.parse(JSON.parse(localStorage.getItem('persist:root')).currentAdmin).token);

/** with combineReducers */
// console.log('current admin: ', JSON.parse(JSON.parse(localStorage.getItem('persist:root')).admin));
// console.log('token: ', JSON.parse(JSON.parse(localStorage.getItem('persist:root')).admin).currentAdmin.token);

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).admin).currentAdmin.token;

const TOKEN = 1;

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const adminRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        token: `Bearer ${TOKEN}`
    }
})