import React from 'react'
import Navs from '../../Navigation/Nav'
import Footer from '../../Footer/footer'
import './contact.css'

function Contact() {
  return (
    <>
        <Navs/>
        <center>
        <form action="#" className='contactContain'>
          <h2>Get in Touch</h2>
          <div className='contactText'>
            <div className='contactInput'>
               <label htmlFor="name">Name </label>
               <input type="text" name="name" placeholder='Your name' required/>
            </div>
           
           <div className='contactInput'>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder='Your email' required/>
           </div>

           <div className='contactInput'>
              <label htmlFor="phone">Phone Number  </label>
              <input type="search" name="phone" placeholder='Your phone number' required/>
           </div>      
        </div>
        <div className='contactInput'>
              <label htmlFor="message">Message </label>
              <textarea name="message" id="" cols="30" rows="10" placeholder='Your message'></textarea>

            </div>
            <center>
             <button>Send message</button>

            </center>
        
        </form>

        </center>
        
          
        <Footer/>
    
    </>
  )
}

export default Contact