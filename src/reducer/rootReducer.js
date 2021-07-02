const initialState = {
    products:[],
    cartProducts:[]
}
const rootReducer = ( state = initialState , action) => {
        switch(action.type){
            case "ADD_PRODUCTS":
                return { ...state , products:action.payload}
            case "ADD_TO_CART":
                if(state.cartProducts.find(item =>item.id === action.payload.id) ){
                   return state
                }
                return{ ...state , cartProducts:[...state.cartProducts , action.payload]}
            case "DELETE_ITEM":
                const cartProductUpdated = state.cartProducts.filter((cartProduct) => cartProduct.id !== action.payload)
                console.log(cartProductUpdated)
                return { ...state , cartProducts:cartProductUpdated}
            default:
                return state;
        }
}

export default rootReducer;