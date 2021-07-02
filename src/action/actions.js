
export const addProducts = (products) => ({
   type:"ADD_PRODUCTS",
   payload:products
})


export const addToCart = (product) => ({
    type:"ADD_TO_CART",
    payload:product,
   
    
}  )

export const deleteToCart = ( id ) => ({
    type:"DELETE_ITEM",
    payload:id
})