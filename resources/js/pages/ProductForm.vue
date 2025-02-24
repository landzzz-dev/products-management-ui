<template>
    <v-sheet class="pa-4" :width="$vuetify.display.smAndUp ? '600px' : '100%'">
        <v-card-title>{{ props.title }}</v-card-title>
        <v-card-text>
            <v-form v-for="(item, index) in props.items" :key=index> 
                <v-text-field
                    v-if="item.title !== 'Id' && item.component === 'Text Field'"
                    :label="item.title"
                    v-model="item.value"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn @click="$emit('close')" elevation="6" width="120px" class="bg-error px-6">
                <v-icon>mdi-close</v-icon>
                <span>Cancel</span>
            </v-btn>
            <v-btn @click="saveProduct()" :loading="saveButtonLoading" elevation="6" class="bg-success px-6" width="120px">
                <v-icon>mdi-content-save</v-icon>
                <span>Save</span>
            </v-btn>
        </v-card-actions>
    </v-sheet>
</template>

<script setup lang="ts">
import { Product } from '@/plugins/types';
import { ref } from 'vue';
import axios from 'axios';
import { useMainStore } from '@/plugins/store';

const emit = defineEmits(['close']);
const store = useMainStore();

const props = defineProps<{
    title: string;
    items: any[];
}>();


//*********** for saving function ***********/
const product = ref<Product>({
    id: null,
    product_code: '',
    product_name: '',
    category: '',
    price: null,
    stock: null,
    rating: null,
    brand: '',
    color: '',
    image: ''
});
const saveButtonLoading = ref<boolean>(false);
const saveProduct = async () => {
    saveButtonLoading.value = true;
    props.items.map((item) => {
        Object.assign(product.value, {
            [item.model]: item.value
        });
    });

    try {
        if(props.title === 'Add Product') {
            // Store new data
            var res = await axios.post('api/products', product.value); 
        } else {
            // Update existing data
            var res = await axios.put(`api/products/${product.value.id}`, product.value); 
        }
        alert(res.data.message);
        emit('close');
        store.getProducts();
    } catch (error) {
        console.error(error);
    } finally {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        saveButtonLoading.value = false
    }
}

</script>