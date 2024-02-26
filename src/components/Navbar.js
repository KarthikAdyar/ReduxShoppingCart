import React from 'react'
import { AppBar, Typography, Toolbar, Badge } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import { IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({

    title: {
        flexGrow: 1,
        marginLeft: "5px",
        marginBottom: " 10px",
    },
    button: {
        marginBottom: " 10px"
    }

}))

const Navbar = () => {
    const classes = useStyles();
    const cartProducts = useSelector(state => state.cartProducts)

    let totalCount = 0
    cartProducts.map((item) => {
        return totalCount += item.quantity
    })
    console.log(totalCount)
    return (
        <div>
            <AppBar style={{ backgroundColor: "#282c34" }} elevation={0}>
                <Toolbar>
                    <Typography variant="h4" color="inherit">
                        <p className="text-warning">React Shopping with Redux</p>

                    </Typography>

                    <Link to="/ReduxShoppingCart" className={classes.title}  >
                        <IconButton style={{ color: "white" }} ><HomeIcon /></IconButton>
                    </Link>

                    <Link to="/cart">

                        <IconButton className="nav-link text-white">

                            <Badge badgeContent={totalCount} className={classes.button} color="error">
                                <ShoppingCartIcon color="inherit" />
                            </Badge>
                        </IconButton>
                    </Link>
                </Toolbar>


            </AppBar>


        </div>
    )
}


export default Navbar