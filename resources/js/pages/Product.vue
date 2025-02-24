<template>
    <div>
        <v-sheet>
            <v-row dense>
                <v-col class="pt-4 px-5 d-flex ga-4" :cols="$vuetify.display.smAndUp ? '8' : '12'">
                    <v-text-field
                        clearable
                        hide-details
                        variant="outlined"
                        density="comfortable"
                        placeholder="Search for products..."
                        prepend-inner-icon="mdi-magnify"
                        v-model="search"
                        @click:clear="store.getProducts()"
                        @keyup.enter="searchProduct()"
                    ></v-text-field>
                    <v-btn @click="searchProduct()" color="success" variant="tonal">Search</v-btn>
                </v-col>
                <v-col 
                :cols="$vuetify.display.smAndUp ? '4' : '12'" 
                :class="$vuetify.display.smAndUp ? 'pt-4' : ''" 
                class="px-5 text-end"
                >
                    <v-btn 
                        variant="tonal" 
                        color="primary" size="large"
                        :block="$vuetify.display.xs ? true : false" 
                        @click="openProductOverlay('Add Product', null)" 
                    >
                        <v-icon>mdi-plus</v-icon>
                        <span>Add Product</span>
                    </v-btn>
                </v-col>
                <v-col cols="12">
                    <v-data-table
                        hover
                        style="--th-bg: #E0E0E0; --th-border-right: 2px solid white"
                        :headers="headers"   
                        :items="store.productList" 
                    >
                        <template v-slot:item.price=" { item }">
                            <td>${{ item.price }}</td>
                        </template>
                        <template v-slot:item.image=" { item }">
                            <td><v-img cover height="100px" width="100px" :src="item.image"></v-img></td>
                        </template>
                        <template v-slot:item.actions=" { item }">
                            <div class="d-flex align-center ga-1">
                                <v-btn @click="openProductOverlay('Edit Product', item)" color="success" icon size="x-small">
                                    <v-icon size="x-large">mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn @click="openDeleteDialog(item)" color="error" icon size="x-small">
                                    <v-icon size="x-large">mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-sheet>    
        
        <v-overlay 
            persistent 
            opacity="0"
            class="bg-white justify-center align-center"
            v-model="productOverlay" 
        >
            <ProductForm
                :title="productObject.title"
                :items="productObject.items"
                @close="productOverlay = false"
            ></ProductForm>
        </v-overlay>

        <v-dialog persistent max-width="500px" v-model="productDeleteDialog">
            <v-sheet class="pa-2">
                <v-card-text class="py-6 text-h6 text-center">
                    <v-icon color="warning" size="100">mdi-alert</v-icon>
                    <p>Are you sure to delete</p>
                    <b>{{ deleteProductObject.brand }} {{ deleteProductObject.product_name }}</b>?
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn @click="productDeleteDialog = false" class="bg-error" width="100px">
                        <v-icon>mdi-close</v-icon>
                        <span>NO</span>
                    </v-btn>
                    <v-btn @click="deleteProduct()" :loading="deleteButtonLoading" class="bg-primary" width="100px">
                        <v-icon>mdi-check</v-icon>
                        <span>YES</span>
                    </v-btn>
                </v-card-actions>
            </v-sheet>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/plugins/store';
import ProductForm from './ProductForm.vue';
import { Product } from "@/plugins/types";
import axios from 'axios';


const headers = ref([
    {title: 'Id', value: 'id', model: null, component: 'Text Field', sortable: true},
    {title: 'Brand', value: 'brand', model: '', component: 'Text Field', sortable: true},
    {title: 'Product Code', value: 'product_code', model: '', component: 'Text Field', sortable: true},
    {title: 'Product Name', value: 'product_name', model: '', component: 'Text Field', sortable: true},
    {title: 'Category', value: 'category', model: '', component: 'Text Field', sortable: true},
    {title: 'Price', value: 'price', model: null, component: 'Text Field', sortable: true},
    {title: 'Stock', value: 'stock', model: null, component: 'Text Field', sortable: true},
    {title: 'Rating', value: 'rating', model: null, component: 'Text Field', sortable: true},
    {title: 'Color', value: 'color', model: '', component: 'Text Field', sortable: true},
    {title: 'Image', value: 'image', model: '', component: 'Text Field', sortable: true},
    {title: 'Actions', value: 'actions', component: 'Button', sortable: false, width: '5%'},
]);


const store = useMainStore();
onMounted(() => {
    if(store.productList.length == 0) store.getProducts();
})


//*********** for search function ***********/
const search = ref<string>('');
const searchProduct = async () => {
    try {
        if(search.value) {
            const res = await axios.get(`api/products/${search.value}`);
            store.productList = res.data;
        } else {
            store.getProducts();
        }
    } catch (err) {
        console.error('Error searching product:', err)
    }
}


//*********** for add / edit function ***********/
const productObject = ref<{
    title: string;
    items: Product[] | any
}>({
    title: '',
    items: []
})
const productOverlay = ref<boolean>(false);
const openProductOverlay = (mode: string, item: Product | null) => {
    productOverlay.value = true;
    productObject.value.title = mode
    if (mode === 'Add Product') {
        // Create an empty product object instead of using headers
        productObject.value.items = headers.value.map((header) => ({
            title: header.title,
            value: header.model,
            model: header.value,
            component: header.component
        })).filter((header) => header.model);
    } else if (item) {
        // Map item values correctly for editing
        productObject.value.items = headers.value.map((header) => ({
            title: header.title,
            value: item[header.value as keyof Product],
            model: header.value,
            component: header.component
        })).filter((header) => header.model);
    }
}


//*********** for delete function ***********/
const productDeleteDialog = ref<boolean>(false);
const deleteProductObject = ref<{
    id: number | null;
    brand: string
    product_name: string
}>({
    id: null,
    brand: '',
    product_name: ''
})
const openDeleteDialog = (item: Product) => {
    productDeleteDialog.value = true;
    deleteProductObject.value = {...item}
}
const deleteButtonLoading = ref<boolean>(false);
const deleteProduct = async () => {
    deleteButtonLoading.value = true;
    try {
        const res = await axios.delete(`api/products/${deleteProductObject.value.id}`);
        alert(res.data.message);
        productDeleteDialog.value = false;
        store.getProducts();
    } catch (err) {
        console.error('Error deleting product:', err)
    } finally {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        deleteButtonLoading.value = false;
    }
}

</script>