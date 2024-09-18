import React from 'react'
import "./Nav.css";
import { Component } from 'react'
import menu from "../assets/menu-line.svg";
import close from "../assets/Close.svg";
import user from "../assets/user.svg";
import cart from "../assets/shopping-cart-line.svg";
import heart from "../assets/heart.svg";
import search from "../assets/search.svg";
import shop from "../assets/Shop.svg";
import blog from "../assets/Blog.svg";
import contact from "../assets/contact.svg";
import { Link } from 'react-router-dom';



// function Navs() {
class Navs extends Component {
   state = { clicked: false };
   handleClick = () => {
      this.setState({ clicked: !this.state.clicked })
   }
   render() {
      return (
         <>
            <nav>
               <Link to={'/'}>
                  <img src="/public/png/LOGO.png" alt="" className='navlogo' />
               </Link>
               <div>
                  <ul id='navbar' className={this.state.clicked ? "active" : ""}>
                     <li>
                        <Link to="/" className='active'>
                           <img src={user} alt="" className='icons hide' /> home
                        </Link>
                        {/* <a className='active'
                         href='#'> <img src={user} alt="" className='icons hide'/> home</a> */}
                     </li>
                     <li>
                        <Link to="/product">
                           <img src={shop} alt="" className='icons' /> shop
                        </Link>
                     </li>
                     <li>
                        <Link to="/blog"> <img src={blog} alt="" className='icons' /> blog </Link>
                        {/* <a href='../Blogs/Blogs.jsx'> <img src={blog} alt="" className='icons'/> blog</a> */}
                     </li>
                     <li>
                        <Link to="/contact"> <img src={contact} alt="" className='icons' /> contact us </Link>
                     </li>
                  </ul>
               </div>
               <div id="mobile" onClick={this.handleClick}>

                  <i id='bar' className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>

               </div>
               <div className='nav-icons'>
                  <a href='#'>
                     <img src={user} alt="" />
                  </a>
                  <a href='#'>
                     <img src={cart} alt="" />
                  </a>
                  <a href='#'>
                     <img src={heart} alt="" />
                  </a>
                  <a href='#'>
                     <img src={search} alt="" />
                  </a>
               </div>
            </nav>
         </>
      )
   }
}


export default Navs