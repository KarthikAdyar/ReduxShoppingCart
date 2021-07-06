import React from 'react'
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { decrementQuantity, deleteToCart, incrementQuantity } from '../action/actions';
import { Card } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    root: {
        width: "350px",
        marginTop: "20px",
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
    }

})
const Cart = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleIncrement = (id) => {

        dispatch(incrementQuantity(id))
    }

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id))
    }
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


    if (selected.length > 0) {
        return (
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

                            <img height="100px" width="100px" src={item.image} alt={item.title} />
                            <Button className={classes.btn_delete} variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>Delete<DeleteIcon />
                            </Button>


                            <p className="text-danger"><b>&#8377;{item.price}</b></p>

                            <div>
                                <Button className={classes.left_btn} color="secondary" onClick={() => handleDecrement(item.id)} variant="outlined"> - </Button>
                                <span className={classes.qty}><strong>Quantity: {item.quantity}</strong></span>
                                <Button onClick={() => handleIncrement(item.id)} variant="outlined" color="primary"> + </Button>
                            </div>

                            <br />
                            <p className="text-danger" style={{ marginLeft: "20%" }}>Total amount: <b>&#8377;{(item.quantity * item.price).toFixed(2)}</b></p>

                        </Card>

                    </div>)}

            </>)
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