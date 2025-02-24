import { Product } from "@/plugins/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useMainStore = defineStore('store', () => {
    const productList = ref<Product[]>([]);

    async function getProducts() {
        try {
            const res = await axios.get('api/products');
            productList.value = res.data;
        } catch (err) {
            console.error('Error getting producst:', err)
        }
    }

    return {
        productList,
        getProducts
    }
})
