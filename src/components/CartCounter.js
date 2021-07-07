import React  from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import {  decrementQuantity, incrementQuantity } from '../store/actions'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    btnminus: {
        marginLeft:"13%"
    },
    qty:{
        marginLeft:"7%"
    },
    btnplus:{
        marginLeft:"10%",
        marginRight:"9%"
    }
})

const CartCounter = (props) => {

    const classes = useStyles();
    const cartProducts = useSelector(state => state.cartProducts)
   

    const dispatch = useDispatch();

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id))
    }

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id))
    }
    const handleQuantity = (id) => {
      
        for (let i of cartProducts) {
            if (i.id === id) {
                return i.quantity;
            }

        }
        return 0
    }
  
    
    return (
        <>
            <Button className={classes.btnminus} disabled = {handleQuantity(props.id) === 0 ? true:false} onClick={ () => handleDecrement(props.id)} variant="outlined">-</Button>
            <span className={classes.qty}><b>Quantity: {handleQuantity(props.id)}</b></span>
            <Button className={classes.btnplus} disabled = {handleQuantity(props.id) === 0 ? true :false} onClick={() => handleIncrement(props.id)} variant="outlined">+</Button>
        </>

    )
}

export default CartCounter