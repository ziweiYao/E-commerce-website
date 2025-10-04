import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import product_type1_banner from './Components/Assets/product_type1_banner.png'
import product_type2_banner from './Components/Assets/product_type2_banner.png'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/product_type1' element={<ShopCategory banner={product_type1_banner} category="product_type1"/>}/>
        <Route path='/product_type2' element={<ShopCategory banner={product_type2_banner} category="product_type2"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
