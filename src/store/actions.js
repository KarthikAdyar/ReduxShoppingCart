
export const addProducts = (products) => ({
    type: "ADD_PRODUCTS",
    payload: products
})


export const addToCart = (product) => ({
    type: "ADD_TO_CART",
    payload: product,
})

export const deleteToCart = (id) => ({
    type: "DELETE_ITEM",
    payload: id
})

export const incrementQuantity = (id) => ({
    type: "INCREMENT_QTY",
    payload: id
})

export const decrementQuantity = (id) => ({
    type: "DECREMENT_QTY",
    payload: id
})