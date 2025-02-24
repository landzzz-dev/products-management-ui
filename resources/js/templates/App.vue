<template>
    <v-app>
        <v-app-bar color="success">
            <v-container class="d-flex align-center">
                <v-toolbar-title>
                    <span style="width: 100%; overflow: hidden; text-overflow: ellipsis;">
                        Products Management UI
                    </span>
                </v-toolbar-title>
                <v-spacer />
                <span>Welcome, {{ props.user.name }}</span>
                <v-btn @click="logout()">
                    <v-icon>mdi-logout</v-icon>
                    <span>Logout</span>
                </v-btn>
            </v-container>
        </v-app-bar>

        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import axios from 'axios';

const props = defineProps({ user: Array })

// router.post('/users', {
//   _token: page.props.csrf_token,
//   name: 'John Doe',
//   email: 'john.doe@example.com',
// })

const logout = async () => {
    try {
        await axios.post('api/logout');
        location.reload();
    } catch (err: any) {
        // alert(err.response.data.message);
        location.reload();
        console.error('Error logout:', err);
    }
};

</script>