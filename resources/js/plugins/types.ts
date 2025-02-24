interface Product {
    id: number | null;
    brand: string;
    product_code: string;
    product_name: string;
    category: string;
    price: number | null;
    stock: number | null;
    rating: number | null;
    color: string;
    image: string
}

interface Login {
    email: string;
    password: string;
}

interface Register {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export {
    Product,
    Login,
    Register
}