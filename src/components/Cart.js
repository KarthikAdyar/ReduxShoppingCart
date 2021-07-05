import React from 'react'
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete'; 
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { decrementQuantity, deleteToCart, incrementQuantity } from '../action/actions';
import { Card } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';


const useStyles = makeStyles({
    root:{
        width:"350px",
        marginTop:"20px",
    },
    btn_delete:{
        marginLeft:"50px"
    }
  
})
const Cart = () => {
    const classes = useStyles();
    const dispatch  = useDispatch();

    const handleIncrement = ( id ) => {
       
        dispatch(incrementQuantity(id))
    }

    const handleDecrement = ( id ) => {
        dispatch(decrementQuantity(id))
    }
    const handleDelete = ( id ) => {
        dispatch(deleteToCart(id))
    } 
    const count = useSelector(state => state.cartProducts.length)
    const selected = useSelector(state => state.cartProducts)

   
    console.log(selected)
    let totalPrice = 0;
    for(let i of selected){
       console.log(i)
        totalPrice += i.price
    }
    console.log(totalPrice)
    
    if(selected.length > 0 ){
        return( 
            <>
            <br /> 
            <br />
            <br />
            <div> <h2>Your cart has {count} items and the total price is &#8377; {totalPrice.toFixed(2)}</h2></div>
             {selected.map(item => 
                <div className={classes.root} key={item.id}>
                
                <Card >
               
                <Typography variant="h5" color="textSecondary" component="h2">
                    {item.title}
                    
                </Typography>
                
                <img height="100px" width="100px"  src={item.image} alt={item.title} />
                <Button className={classes.btn_delete} variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>Delete<DeleteIcon />
                </Button>
               
               
                <p className="text-danger"><b>&#8377;{item.price}</b></p>
                
                <div>
                 <Button onClick={ () => handleDecrement(item.id)} variant="outlined"> - </Button> Quantity:{item.quantity} 
                <Button  onClick={() => handleIncrement(item.id)} variant="outlined"> + </Button>   
                </div>
                
                <br />
                <p>Total amount: {item.quantity * item.price}</p>
               
                </Card>
                
                </div>)}
                
            </>)
    }
    else{
        return(
            <div>
            <br /> 
            <br />
            <br />
            <h1>Your cart is empty</h1>
            </div>
        )
    }
 
   
} 

export default Cart;