import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
    defaults: {
        VBtn: {
            rounded: 'pill',
            class: 'text-none',
            size: 'large'
        },
        VDataTable: {
            fixedHeader: true,
            hover: true
        },
        VTextField: {
            density: 'comfortable',
            variant: 'outlined'
        },
        VSheet: {
            rounded: 'xl',
            elevation: '6',
        }
    }
})

export default vuetify;