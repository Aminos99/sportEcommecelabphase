import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import HomePage from './pages/HomePage';
import Product from './pages/Product';
import ContactPage from './pages/ContactPage';
import ProductDetails from './pages/ProductDetails';
import ProductManager from './pages/ProductManager';
import Usercart from './pages/Usercart';
import Cartmanage from './pages/Cartmanage';
import Placeorder from './pages/Placeorder';
import Displayorders from './pages/Displayorders';
function App() {
  return (

<BrowserRouter>
<Routes>
  <Route path='/' element={<Signup/>}/>
  <Route path='/login' element={<Signin/>}/>
  <Route path='/Home' element={<HomePage/>}></Route>
  <Route path='/products' element={<Product/>}/>
  <Route path='/Contact' element={<ContactPage/>}/>
  <Route path='/ProductDetails/:id' element={<ProductDetails/>}/>
  <Route path='/productManager' element={<ProductManager/>}/>
  <Route path='/cart' element={<Usercart/>}/>
  <Route path='/cartManage' element={<Cartmanage/>}/>
  <Route path='/PlaceOrder' element={<Placeorder/>}/>
  <Route path='/orders' element={<Displayorders/>}/>
</Routes>
</BrowserRouter>




  
  );
}

export default App;
