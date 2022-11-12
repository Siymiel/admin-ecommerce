import { userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userSlice"
import { productStart, productSuccess, productFailure,
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
} from './productSlice'

export const updateProduct = async (dispatch, product, id) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put(`/products/${id}`, product)
        dispatch(updateProductSuccess(res.data))
    } catch (err) {
        dispatch(updateProductFailure())
    }
}

export const createProduct = async (dispatch, product) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post('/products/create', product)
        dispatch(addProductSuccess(res.data))
    } catch (err) {
        dispatch(addProductFailure())
    }
}

export const adminLogin = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await userRequest.post('/login', user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}

// GET all products
export const fetchProducts = async (dispatch) => {
    dispatch(productStart());

    try {
        const res = await userRequest.get('/products')
        dispatch(productSuccess(res.data.products))
    } catch (err) {
        dispatch(productFailure())
    }
}

// DELETE products
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());

    try {
        await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    } catch (err) {
        dispatch(deleteProductFailure())
    }
}

// Single Product
export const getProduct = async (id, dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await userRequest.get(`/products/${id}`)
        dispatch(getProductSuccess(res.data.product))
    } catch (err) {
        dispatch(getProductFailure())
    }
}