import '@/plugins/bootstrap';
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { createPinia } from 'pinia';
import router from '@/plugins/router';
import vuetify from '@/plugins/vuetify';

const pinia = createPinia()

createInertiaApp({
    resolve: (name) => {
        if (name.startsWith('auth/')) return import(`./auth/${name.replace('auth/', '')}.vue`);
        else return import(`./templates/${name}.vue`);
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .use(router)
            .use(vuetify)
            .mount(el);
    },
});


