// ============================================================
// FIREBASE CONFIGURATION - Apna Market
// ============================================================

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, set, get, onValue, remove, update, child, push } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyA2S1ycLthPrWQzkvcoy9sGtqD-_uq_UZM",
    authDomain: "apna-market-10099.firebaseapp.com",
    databaseURL: "https://apna-market-10099-default-rtdb.firebaseio.com",
    projectId: "apna-market-10099",
    storageBucket: "apna-market-10099.firebasestorage.app",
    messagingSenderId: "729708328870",
    appId: "1:729708328870:web:4121e85411deb637804167",
    measurementId: "G-HH7XNCX4B5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ============================================================
// DATABASE FUNCTIONS
// ============================================================

// ----- SHOPS -----
export function getShopsRef() {
    return ref(database, 'shops');
}

export function getShopRef(shopId) {
    return ref(database, `shops/${shopId}`);
}

export async function saveShop(shopData) {
    const shopRef = push(ref(database, 'shops'));
    await set(shopRef, shopData);
    return shopRef.key;
}

export async function updateShop(shopId, shopData) {
    const shopRef = ref(database, `shops/${shopId}`);
    await update(shopRef, shopData);
}

export async function deleteShop(shopId) {
    const shopRef = ref(database, `shops/${shopId}`);
    await remove(shopRef);
}

export function listenShops(callback) {
    const shopsRef = ref(database, 'shops');
    onValue(shopsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const shops = Object.keys(data).map(key => ({ ...data[key], firebaseKey: key }));
            callback(shops);
        } else {
            callback([]);
        }
    });
}

// ----- PRODUCTS -----
export function getProductsRef() {
    return ref(database, 'products');
}

export function getProductRef(productId) {
    return ref(database, `products/${productId}`);
}

export async function saveProduct(productData) {
    const productRef = push(ref(database, 'products'));
    await set(productRef, productData);
    return productRef.key;
}

export async function updateProduct(productId, productData) {
    const productRef = ref(database, `products/${productId}`);
    await update(productRef, productData);
}

export async function deleteProduct(productId) {
    const productRef = ref(database, `products/${productId}`);
    await remove(productRef);
}

export function listenProducts(callback) {
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const products = Object.keys(data).map(key => ({ ...data[key], firebaseKey: key }));
            callback(products);
        } else {
            callback([]);
        }
    });
}

// ----- CATEGORIES -----
export function getCategoriesRef() {
    return ref(database, 'categories');
}

export async function saveCategories(categoriesData) {
    const categoriesRef = ref(database, 'categories');
    await set(categoriesRef, categoriesData);
}

export async function getCategories() {
    const categoriesRef = ref(database, 'categories');
    const snapshot = await get(categoriesRef);
    return snapshot.val() || [];
}

export function listenCategories(callback) {
    const categoriesRef = ref(database, 'categories');
    onValue(categoriesRef, (snapshot) => {
        const data = snapshot.val();
        callback(data || []);
    });
}

// ----- ADMIN CONFIG -----
export function getAdminConfigRef() {
    return ref(database, 'adminConfig');
}

export async function getAdminConfig() {
    const configRef = ref(database, 'adminConfig');
    const snapshot = await get(configRef);
    return snapshot.val() || {};
}

export async function saveAdminConfig(configData) {
    const configRef = ref(database, 'adminConfig');
    await set(configRef, configData);
}
