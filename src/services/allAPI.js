import { commonAPI } from "./commonAPI";
import SERVER_URL from "./serverUrl";

export const  registerAPI=async(reqBody)=>
{
    try{
        return await commonAPI("POST",`${SERVER_URL}/register`,null,reqBody)
    }
    catch(err)
    {
        console.log(err);
        

    }

}
export const loginAPI=async(reqBody)=>
{
    return await commonAPI("POST",`${SERVER_URL}/login`,null,reqBody)
}
export const allTasksAPI=async(reqHeader)=>
{
    return await commonAPI("GET",`${SERVER_URL}/viewusers`,reqHeader)
}
export const deleteUserAPI=async(reqHeader,id)=>
{
return await commonAPI("DELETE",`${SERVER_URL}/user/${id}/delete`,reqHeader)
}
export const addProductAPI = async (reqHeader, reqBody) => {
    
      return await commonAPI("POST", `${SERVER_URL}/add-products`, reqHeader, reqBody);
};
export const viewProductsAPI=async(reqHeader)=>
{
    return await commonAPI("GET",`${SERVER_URL}/view-products`,reqHeader)
}
export const editProductAPT=async(id,reqHeader,reqBody)=>
{
return await commonAPI("PUT",`${SERVER_URL}/edit-product/${id}`,reqHeader,reqBody)
}
export const deleteProductAPI=async(id,reqHeader)=>
{
    return await commonAPI("DELETE",`${SERVER_URL}/delete-product/${id}`,reqHeader)
}

export const viewProductsUserAPI=async(reqHeader,category)=>
{
    return await commonAPI('GET',`${SERVER_URL}/viewProducts?category=${category}`,reqHeader)
}
  
export const addToCartAPI=async(reqHeader,reqBody)=>
{
    return await commonAPI('POST',`${SERVER_URL}/add-to-cart`,reqHeader,reqBody)
}
export const viewCartAPI=async(reqHeader)=>
    {
        return await commonAPI('GET',`${SERVER_URL}/view-cart`,reqHeader)
    }
export const addToWishlist=async(reqHeader,reqBody)=>
{
return await commonAPI('POST',`${SERVER_URL}/add-to-wishlist`,reqHeader,reqBody)
}

export const  fetchWishlistAPI =async(reqHeader)=>
{
    return await commonAPI('GET',`${SERVER_URL}/wishlist`,reqHeader)
}
export const editCartAPI=async(reqHeader,id,reqBody)=>
{
return await commonAPI('PUT',`${SERVER_URL}/editcart/${id}`,reqHeader,reqBody)
}
export const deleteCartAPI=async(reqHeader,productId)=>
{
    return await commonAPI('DELETE',`${SERVER_URL}/delete-cart/${productId}/delete`,reqHeader)
}

export const addOrderAPI=async(reqHeader,reqBody)=>
{
return await commonAPI('POST',`${SERVER_URL}/add-order`,reqHeader,reqBody)
}
export const deleteFullCart=async(reqHeader,reqBody)=>
{
return await commonAPI('DELETE',`${SERVER_URL}/delete-full-cart`,reqHeader,reqBody)
}
export const addreview=async(reqHeader,reqBody)=>
{
return await commonAPI('POST',`${SERVER_URL}/add-review`,reqHeader,reqBody)
}

export const viewReviews=async()=>
{
    return await commonAPI('GET',`${SERVER_URL}/view-reviews`)
}
export const AddAddress=async(reqHeader,reqBody)=>
{
    return await commonAPI('POST',`${SERVER_URL}/add-address`,reqHeader,reqBody)

}
export const viewAllOrders=async(reqHeader)=>
{
    return await commonAPI('GET',`${SERVER_URL}/view-orders`,reqHeader)
}

export const updateOrderStatus=async( id,reqHeader,reqBody)=>
{
return await commonAPI('PUT',`${SERVER_URL}/edit-order/${id}`,reqHeader,reqBody)
}
export const userViewAddress=async(reqHeader)=>
{
    return await commonAPI('GET',`${SERVER_URL}/view-address-user`,reqHeader)
}

export const viewAdress=async()=>
{
    return await commonAPI('GET',`${SERVER_URL}/view-address`)
}
export const viewOrdersByUser=async(reqHeader)=>
{
    return await commonAPI('GET',`${SERVER_URL}/user-orders`,reqHeader)
}