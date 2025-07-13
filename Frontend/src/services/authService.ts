// src/services/authService.ts

import axios from 'axios';

// Create an Axios instance for authentication
const authClient = axios.create({
    baseURL: 'http://localhost:3000/api/auth', // replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    async login(UserName: string, UserLoginPassword: string) {
        try {
            const response = await authClient.post('/login', { UserName, UserLoginPassword });
            return response.data; 
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    async checkUser(token: string) {
        try {
            const response = await authClient.get('/check', {
                headers: {
                    'access_token': token
                }
            });
            return response.data; 
        } catch (error) {
            console.error('Error checking user:', error);
            throw error;
        }
    },
};