import React ,{ useEffect } from 'react'
import axios from 'axios'
import { addProducts , addToCart} from '../action/actions'
import {useDispatch  , useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      height:"100%",
      padding:10,
      marginLeft:20,
      marginTop:30
    },
    main: {
        flexGrow:1
    }
  });

const Products = () => {

    const classes  = useStyles()
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.products.data)
  
    const fetchProducts = async() => {
        const response = await axios.get('https://fakestoreapi.com/products').catch(err => console.log(err))
        dispatch(addProducts(response))
    }

    useEffect( () => {
       fetchProducts()
    } , []);

    const addtoCart = async (id) => {
       console.log(id)
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`).catch(err => console.log(err))
        const data = response.data;
        data.quantity = 1;
        console.log(data)
        dispatch(addToCart(data))
    }

    if(productDetails)
    return(
        <div className={classes.main}>
        <br /> <br />
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" >
           {productDetails.map(item =>
             
             <Card key={item.id} className={classes.root}>
                <CardActionArea>
                   <img width="350px" height="400px" src={item.image} alt={item.title}/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.description}
                      </Typography>
                      
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={() => addtoCart(item.id)} size="small" color="primary" variant="outlined">
                        Add to Cart
                    </Button>
                </CardActions>
             </Card>
            
              )}
            </Grid>
        </div>
    )
    else{
        return ( <>
            <br /> <br /> <br /> 
            <h1>Loading...</h1> 
            </>)
    }
}

export default Products;