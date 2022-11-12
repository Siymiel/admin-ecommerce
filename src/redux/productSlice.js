import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: "products",
    initialState: {
        productsList: [],
        product: null,
        isFetching: false,
        error: false
    },
    reducers: {
        // GET Products
        productStart: (state) => {
            state.isFetching = true;
        },
        productSuccess: (state, action) => {
            state.isFetching = false;
            state.productsList = action.payload;
        },
        productFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // DELETE product
        deleteProductStart: (state) => {
            state.isFetching = true;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            let index = state.productsList.findIndex((item) => item.id === action.payload)
            state.productsList.splice(index, 1)
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // SHOW a product
        getProductStart: (state) => {
            state.isFetching = true;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.product = action.payload;
        },
        getProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // SHOW a product
        addProductStart: (state) => {
            state.isFetching = true;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.productsList.push(action.payload);
        },
        addProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // UPDATE a product
        updateProductStart: (state) => {
            state.isFetching = true;
        },
        updateProductSuccess: (state, action, id) => {
            state.isFetching = false;
            let index = state.productList.findIndex((item) => item._id === id)
            state.productsList[index] = action.payload
        },
        updateProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { 
    productStart, 
    productSuccess, 
    productFailure, 
    deleteProductStart, 
    deleteProductSuccess, 
    deleteProductFailure, 
    getProductStart, 
    getProductSuccess, 
    getProductFailure, 
    addProductStart, 
    addProductSuccess, 
    addProductFailure, 
    updateProductStart, 
    updateProductSuccess, 
    updateProductFailure, 
} = productSlice.actions;
export default productSlice.reducer;