import { defineStore } from 'pinia';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null,
        token: localStorage.getItem('token') || '',
    }),

    actions: {
        async login(UserName: string, UserLoginPassword: string) {
            try {
                const token = await authService.login(UserName, UserLoginPassword);
                localStorage.setItem('token', token);
                this.token = token;
                await this.checkUser(); 
                return token;
            } catch (error) {
                console.error('Error during login:', error);
                throw error;
            }
        },

        async logout() {
            localStorage.removeItem('token');
            this.token = '';
            this.isAuthenticated = false;
            this.user = null;
        },

        async checkUser() {
            if (!this.token) {
                throw new Error('No token found');
            }

            try {
                const user = await authService.checkUser(this.token);
                this.user = user;
                this.isAuthenticated = true;
            } catch (error) {
                this.logout();
                throw error;
            }
        },
    },

    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
    },
});