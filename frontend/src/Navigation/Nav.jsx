import React, { useState } from 'react'
import "./Nav.css";
import menu from "../assets/menu-line.svg";
import close from "../assets/Close.svg";
import user from "../assets/user-icon.svg";
import cart from "../assets/shopping-cart-line.svg";
import heart from "../assets/heart.svg";
import search from "../assets/search.svg";
import shop from "../assets/Shop.svg";
import blog from "../assets/Blog.svg";
import contact from "../assets/contact.svg";
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navs() {
    // for the mobile menu
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(!clicked)
    }

    const { currentUser, logout } = useAuth();

    return (
        <>
            <nav>
                <Link to={'/'}>
                    <img src="/public/png/LOGO.png" alt="" className='navlogo' />
                </Link>

                <div>
                    <ul id='navbar'>
                        <li>
                            <NavLink to="/home" className={({ isActive, isPending }) => `${isActive ? 'active' : ''}`}>
                                home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/product" className={({ isActive, isPending }) => `${isActive ? 'active' : ''}`}>
                                <img src={shop} alt="" className='icons' /> shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog" className={({ isActive, isPending }) => `${isActive ? 'active' : ''}`}
                            > <img src={blog} alt="" className='icons' /> blog </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive, isPending }) => `${isActive ? 'active' : ''}`}
                            > <img src={contact} alt="" className='icons' /> contact us</NavLink>
                        </li>
                        {currentUser ? (
                            <>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
                <div id="mobile" onClick={handleClick}>

                    {clicked ? (<img src={close} alt="" />) : (<img src={menu} alt="" />)}
                    {clicked ?
                        (<div className=''>
                            {/* {user ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button className="nav-button" onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )} */}
                            {currentUser ?
                                <Link to={'/profile'}>
                                    <img src={user} alt="" />
                                </Link>
                                : <></>}
                            <Link to={'/cart'}>
                                <img src={cart} alt="" />
                            </Link>
                            <Link to={'/'}>
                                <img src={heart} alt="" />
                            </Link>
                            <Link to={'/'}>
                                <img src={search} alt="" />
                            </Link>
                        </div>)
                        : <></>}
                    {/* <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i> */}

                </div>
                <div className='nav-icons'>
                    {currentUser ?
                        <Link to={'/profile'}>
                            <img src={user} alt="" />
                        </Link>
                        : <></>
                    }
                    <Link to={'/cart'}>
                        <img src={cart} alt="" />
                    </Link>
                    <Link to={'/wishlist'}>
                        <img src={heart} alt="" />
                    </Link>
                    <Link to={'/'}>
                        <img src={search} alt="" />
                    </Link>
                </div>
                {
                    currentUser ?
                        <button className="nav-button" onClick={logout}>Logout</button>
                        : <></>
                }
            </nav >
        </>
    )
}
// }

export default Navs