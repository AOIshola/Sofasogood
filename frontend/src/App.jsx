import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blogs from './Pages/Blogs/Blogs';
import ErrorPage from './Pages/NoPage/ErrorPage';
import Products from './Pages/Products/Products';
import SingleProduct from './Pages/Products/SingleProduct';
import CartPage from './Pages/Products/CartPage';
import Contact from './Pages/Contact/Contact';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoutes from './components/PrivateRoutes';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import { BlogProvider } from './contexts/BlogContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import { ReviewsProvider } from './contexts/ReviewContext';
import ProfilePage from './Pages/Auth/ProfilePage';
import WishlistPage from './Pages/WishlistPage';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <ReviewsProvider>
            <ProductProvider>
              <BlogProvider>
                <CartProvider>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/blog" element={<Blogs />} />
                    <Route path="/product" element={<Products />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    {/* <Route path="/products" exact component={Products} /> */}
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route element={<PrivateRoutes />}>
                      <Route path="/cart" element={<CartPage />} />
                      <Route path='/profile' element={<ProfilePage />} />
                      <Route path='/wishlist' element={<WishlistPage />} />
                    </Route>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </CartProvider>
              </BlogProvider>
            </ProductProvider>
          </ReviewsProvider>
        </AuthProvider>
      </Router >
    </>
  )
}

export default App
