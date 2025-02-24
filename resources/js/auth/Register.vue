<template>
    <div class="container">
        <v-sheet class="pa-6" :width="$vuetify.display.xs ? '95%' : '500px'">
            <v-card-title class="text-h5">REGISTER</v-card-title>
            <v-card-text>
                <v-text-field
                    placeholder="name"
                    prepend-inner-icon="mdi-account"
                    v-model="credentials.name"
                ></v-text-field>
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
                <v-text-field
                    placeholder="confirm password"
                    prepend-inner-icon="mdi-lock"
                    v-model="credentials.password_confirmation"
                ></v-text-field>
            </v-card-text>
            <v-cart-actions>
                <v-btn @click="register()" block class="bg-success">
                    <v-icon>mdi-account</v-icon>
                    <span>Register</span>
                </v-btn>
            </v-cart-actions>
            <v-card-actions class="mt-2 justify-end">
                <p>Already registered? <Link href="/login">Login here</Link></p>
            </v-card-actions>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Register } from '@/plugins/types';
import { Link } from '@inertiajs/vue3';
import axios from 'axios';

const credentials = ref<Register>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const register = async () => {
    try {
        await axios.post('api/register', credentials.value)
        location.reload();
    } catch (err: any) {
        alert(err.response.data.message)
        console.error('Error register:', err)
    }
}

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