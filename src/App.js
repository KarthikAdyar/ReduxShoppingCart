import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cart from './components/Cart'
function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />

        </div>


        <Switch>
          <Route exact path='/' component={Products} />
          <Route exact path='/cart' component={Cart} />

        </Switch>
      </BrowserRouter>
    </>
  )
}
export default App;
