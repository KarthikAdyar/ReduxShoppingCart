const initialState = {
    products: [],
    cartProducts: []
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCTS":
            return { ...state, products: action.payload }
        case "ADD_TO_CART":
            if (state.cartProducts.find(item => item.id === action.payload.id)) {
                let index = state.cartProducts.findIndex(index => index.id === action.payload.id)
                return {
                    ...state,
                    cartProducts:
                        [...state.cartProducts.slice(0, index), {
                            ...state.cartProducts[index], quantity: state.cartProducts[index].quantity + 1
                        }, ...state.cartProducts.slice(index + 1)]

                }
            }
            else {
                return { ...state, cartProducts: [...state.cartProducts, action.payload] }
            }
        case "DELETE_ITEM":
            const cartProductUpdated = state.cartProducts.filter((cartProduct) => cartProduct.id !== action.payload)
            console.log(cartProductUpdated)
            return { ...state, cartProducts: cartProductUpdated }

        case "INCREMENT_QTY":
            let index = state.cartProducts.findIndex(index => index.id === action.payload)
            
            return {
                ...state,
                cartProducts:
                    [...state.cartProducts.slice(0, index), {
                        ...state.cartProducts[index], quantity: state.cartProducts[index].quantity + 1
                    }, ...state.cartProducts.slice(index + 1)]

            }
        
        
        case "DECREMENT_QTY":
            let index_ = state.cartProducts.findIndex(index => index.id === action.payload)
            if (state.cartProducts[index_].quantity > 1) {

                return {
                    ...state,
                    cartProducts:
                        [
                            ...state.cartProducts.slice(0, index_), {
                                ...state.cartProducts[index_], quantity: state.cartProducts[index_].quantity - 1

                            }, ...state.cartProducts.slice(index_ + 1)
                        ]
                }
            }
            else if (state.cartProducts[index_].quantity === 1) {
                let cartProductUpdated = state.cartProducts.filter(
                    (item) => item.id !== state.cartProducts[index_].id)
                return {
                    ...state, cartProducts: cartProductUpdated
                }
            }
            else {
                return state
            }
        default:
            return state;
    }
}

export default rootReducer;