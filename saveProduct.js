// ============================================================
// saveProduct.js - Product Upload Function
// Apna Market
// ============================================================

let isUploading = false;

export async function saveProduct({
    currentShop,
    saveProductToFirebase,
    showToast,
    t,
    renderShopProducts,
    renderAll,
    prodNameEl,
    prodCategoryEl,
    prodPriceEl,
    prodImageEl,
    prodDescEl,
    addProductBtnEl
}) {
    
    // Prevent double click
    if (isUploading) {
        showToast('⏳ कृपया रुकें, पिछला अपलोड हो रहा है...');
        return;
    }
    
    if (!currentShop) { 
        showToast(t('loginFirst')); 
        return; 
    }
    
    const name = prodNameEl.value.trim();
    const category = prodCategoryEl.value;
    const price = prodPriceEl.value;
    const img = prodImageEl.value.trim();
    const desc = prodDescEl.value.trim();
    
    if (!name) { 
        showToast(t('productNameRequired')); 
        return; 
    }
    if (!price) { 
        showToast(t('priceRequired')); 
        return; 
    }
    
    // Disable button to prevent double click
    isUploading = true;
    const originalText = addProductBtnEl.textContent;
    addProductBtnEl.textContent = '⏳ जोड़ रहा है...';
    addProductBtnEl.disabled = true;
    
    const newProduct = {
        shopCode: currentShop.code,
        name: name,
        category: category || 'अन्य',
        price: parseFloat(price),
        img: img || 'https://via.placeholder.com/200/203a43/ffffff?text=No+Image',
        desc: desc || ''
    };
    
    try {
        const key = await saveProductToFirebase(newProduct);
        newProduct.firebaseKey = key;
        
        // Clear form
        prodNameEl.value = '';
        prodPriceEl.value = '';
        prodImageEl.value = '';
        prodDescEl.value = '';
        
        // Update UI
        renderShopProducts();
        renderAll();
        showToast(t('addSuccess'));
        
        return newProduct;
        
    } catch (err) {
        showToast('❌ Firebase Error: ' + err.message);
        console.error('Save product error:', err);
        throw err;
        
    } finally {
        // Re-enable button
        isUploading = false;
        addProductBtnEl.textContent = originalText;
        addProductBtnEl.disabled = false;
    }
}

export default saveProduct;
