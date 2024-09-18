import React, {useState} from 'react'
import './footer.css'

function Footer() {
    // to toggle table for mobile view

    // const [showData, setShowData] = useState(false);n
    // const handleClick = (event) => {
    //     setShowData(!showData);     
    // };
    const [activeHeading, setActiveHeading] = useState(null);

    const handleHeadingClick = (heading) => {
        if (activeHeading === heading){
            setActiveHeading(null);
        } else {
            setActiveHeading(heading);
        }
    };

  return (
    <>
        <div className='footercontain'>
        
            <div className='footerInner1'>
                    <img src="public/png/LOGO.png" alt="" className='footerlogo'/> 
                    <h5>JOIN US</h5>
                    <p>Be the first to know about new collections and product launches.</p>
                    <input type="text" placeholder='Your email' />
                </div>
                <div className='footerInner2'>
                    <h2>We're redefining what it means to furnish your space.</h2>
                    <table className='footerBig'>
                        <tbody>
                            <tr>
                                <th>PRODUCTS</th>
                                <th>CATAGORIES</th>
                                <th>CONTACT US</th>
                                <th>HELP</th>
                            </tr>
                            
                            <tr>
                                <td><a href="#">Bed</a></td>
                                <td><a href="#">Bathroom</a></td>
                                <td>1 800 234 3432</td>
                                <td>Terms of Use</td>
                            </tr>
                            <tr>
                                <td><a href="#">Sofa</a></td>
                                <td><a href="#">Kitchens</a></td>
                                <td>hello@Sofasogood.com</td>
                                <td>Privacy Policy</td>
                            </tr>
                            <tr>
                                <td><a href="#">Console</a></td>
                                <td><a href="#">Backyards</a></td>
                                <td></td>
                                <td>Refund Policy</td>
                            </tr>
                            <tr>
                                <td><a href="#">Tables</a></td>
                                <td><a href="#">Basements</a></td>
                                <td></td>
                                <td>Shipping Policy</td>
                            </tr>
                            <tr>
                                <td><a href="#">Coffee Tables</a></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><a href="#">Chairs</a></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    

                    <div className='footerInnerMobile'>
                        <h5 onClick={() => handleHeadingClick('products')}>
                            PRODUCTS</h5>
                            {activeHeading === 'products' && ( 
                                <ul>
                                    <li>Bed</li>
                                    <li>Sofa</li>
                                    <li>Console</li>
                                    <li>Table</li>
                                    <li>Coffee Table</li>
                                    <li>Chairs</li>

                                </ul>
                            )}
                        <h5 onClick={() => handleHeadingClick('categories')}>
                            CATEGORIES</h5>
                            {activeHeading === 'categories' && ( 
                                <ul>
                                    <li>Bathroom</li>
                                    <li>Kitchens</li>
                                    <li>Backyards</li>
                                    <li>Basements</li>
                                </ul>
                            )}
                        <h5 onClick={() => handleHeadingClick('contact')}>
                            CONTACT US</h5>
                            {activeHeading === 'contact' && ( 
                                <ul>
                                    <li>1 800 234 3432</li>
                                    <li>hello@Sofasogood.com</li>
                                </ul>
                            )}
                        <h5 onClick={() => handleHeadingClick('help')}>
                            HELP</h5>
                            {activeHeading === 'help' && ( 
                                <ul>
                                    <li>Terms of Use</li>
                                    <li>Privacy Policy</li>
                                    <li>Refund Policy</li>
                                    <li>Shipping Policy</li>
                                </ul>
                            )}
                        <h5 onClick={() => handleHeadingClick('join')}>
                            JOIN US</h5>
                            {activeHeading === 'join' && ( 
                                <ul>
                                  
                                </ul>
                            )}
                        <center>
                           <img src="public/png/LOGO.png" alt="" className='footerlogo'/>
                        </center>
                        
                    </div>
                </div>
        </div>    
    </>
  )
}

export default Footer