<template>
    <div
        class="flex justify-center items-center min-h-screen bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')] bg-cover bg-center">
        <div class="panel sm:w-[480px] m-6 max-w-lg w-full">
            <h2 class="font-bold text-2xl mb-3">Sign In</h2>
            <p class="mb-7">Enter your name and password to login</p>
            <form class="space-y-5" @submit.prevent="handleLogin">
                <div>
                    <label for="UserName">Name</label>
                    <input id="UserName"  type="text"  class="form-input"  placeholder="Enter your UserName" v-model="UserName"
                        required />
                </div>
                <div>
                    <label for="UserLoginPassword">Password</label>
                    <input id="UserLoginPassword" type="password" class="form-input" placeholder="Enter Password"
                        v-model="UserLoginPassword" required />
                </div>
               
                <button type="submit" class="btn btn-primary w-full">SIGN IN</button>
            </form>
            <div
                class="relative my-7 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                <div class="font-bold text-white-dark bg-white dark:bg-[#0e1726] px-2 relative z-[1] inline-block">
                    <span>OR</span></div>
            </div>
          
            <p class="text-center">
                Dont't have an account ? <router-link to="/auth/boxed-signup"
                    class="text-primary font-bold hover:underline">Sign Up</router-link>
            </p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';
useMeta({ title: 'Login Boxed' });
import { ref } from 'vue';

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const UserName = ref('');
const UserLoginPassword = ref('');
const error = ref<string>('');

const router = useRouter();

const handleLogin = async () => {
    try {
        await authStore.login(UserName.value, UserLoginPassword.value);

        router.push('/'); // Redirect to a protected route after successful login
    } catch (err) {
        if (err instanceof Error) {
            error.value = err.message;
        } else if (typeof err === 'string') {
            error.value = err;
        } else {
            error.value = 'An unknown error occurred';
        }
    }
};

</script>