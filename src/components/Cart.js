import React , { useState }from 'react'
import { Link } from 'react-router-dom' 
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteToCart  , deleteCartItems } from '../store/actions';
import { Card } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import CartCounter from './CartCounter';
import StripeCheckout from 'react-stripe-checkout'
const useStyles = makeStyles({
    root: {
        width: "350px",
        marginTop: "20px",
        marginLeft:"60px",
        marginRight:"10px"
    },
    btn_delete: {
        marginLeft: "50px"
    },
    qty: {
        marginLeft: "10px",
        marginRight: "15px"
    },
    left_btn: {
        marginLeft: "10%"
    },
    card:{
        marginRight: "10%",
        marginBottom:"3%",
        height:"90%",
        width:"400px"
        },
    order:{
      display:"flex",
      justifyContent:"center"
    }

})
const Cart = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [display , setDisplay] = useState(false);
    const handleDelete = (id) => {
        dispatch(deleteToCart(id))
    }

    

    
    const selected = useSelector(state => state.cartProducts)

    let totalPrice = 0;
    let count = 0
    for (let i of selected) {
        totalPrice += (i.price * i.quantity)
        count += i.quantity
    }

    const getToken = (token) => {
        console.log(token);
        setDisplay(true);
        dispatch(deleteCartItems())
        
    }

    if (selected.length > 0 && display === false) {
        return (
            <>
                <br />
                <br />
                <br />
                <div className={classes.order}> 
                <h2>Your cart has {count} items and the total price is &#8377; {totalPrice.toFixed(2)}</h2>
                </div>
                
                <div className={classes.order}>
                    
                    <StripeCheckout 
                    label="Place your order here"
                    billingAddress
                    shippingAddress
                    stripeKey="pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
                    panelLabel = {`Pay ${totalPrice}`}
                    token={getToken}
                    />
                </div>
                <div>
                <Grid  container direction="row" justify="flex-start" alignItems="center" >
                {selected.map(item =>
                    <div className={classes.root} key={item.id}>

                        <Card className={classes.card}>

                            <Typography variant="h5" color="textSecondary" component="h2">
                                {item.title}

                            </Typography>

                            <img height="100px" width="100px" src={item.image} alt={item.title} />
                            <Button className={classes.btn_delete} variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>Delete<DeleteIcon />
                            </Button>


                            <p className="text-danger"><b>&#8377;{item.price}</b></p>
                            <div><CartCounter id ={ item.id}/></div>
                            <br />
                            <p className="text-danger" style={{ marginLeft: "20%" }}>Total amount: <b>&#8377;{(item.quantity * item.price).toFixed(2)}</b></p>

                        </Card>

                    </div>)}
                    </Grid>
                    
                    </div>

            </>)
    }
    else if(display === true){
      
        return(
            <>
                <br/><br /><br />
                <h1 className="text-success">Successfully booked</h1>
                <Link to="/" className="btn btn-primary">Go to Home</Link>
            </>
        )
    }
    else {
        return (
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