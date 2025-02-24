<template>
    <div class="container">
        <v-sheet class="pa-6" :width="$vuetify.display.xs ? '95%' : '500px'">
            <v-card-title class="text-h5">LOGIN</v-card-title>
            <v-card-text>
                <v-text-field
                    placeholder="email"
                    prepend-inner-icon="mdi-email"
                    v-model="credentials.email"
                ></v-text-field>
                <v-text-field
                    placeholder="password"
                    prepend-inner-icon="mdi-lock"
                    v-model="credentials.password"
                ></v-text-field>
            </v-card-text>
            <v-cart-actions>
                <v-btn @click="login()" block class="bg-success">
                    <v-icon>mdi-login</v-icon>
                    <span>Login</span>
                </v-btn>
            </v-cart-actions>
            <v-card-actions class="mt-4 justify-end">
                <span>Not registered? <Link href="/register">Register here</Link></span>
            </v-card-actions>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Login } from '@/plugins/types';
import { Link } from '@inertiajs/vue3';
import axios from 'axios';

const credentials = ref<Login>({
    email: '',
    password: ''
});


const login = async () => {
    try {
        await axios.post('api/login', credentials.value);
        location.reload();
    } catch (err: any) {
        alert(err.response.data.message);
        console.error('Error login:', err);
    }
};

</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    position: absolute;
    justify-items: center;
    align-content: center;
}
</style>