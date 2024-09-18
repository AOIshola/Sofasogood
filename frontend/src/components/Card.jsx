import React from 'react'
import "./card.css"

function Card({styles, img, title, desciption, prevPrice, newPrice, writer, testimonial, date, report, comment, detail}) {
  return (
    <>
      <section className='cardds'>
        <div className={styles}> 
          <img src={img} alt={title}
          className='cards-img' />
          <div className='cardsTexts'>
            {/* main Card Display and blog card display help swicth properties of a card to be displayed using css display: none
            so that the blog card will display as it should */}
            <div className='mainCardDisplay'>
                <h4>{title}</h4>
                <p>{desciption}</p>
                <div className='prices'>
                  <p className='prevp'>{prevPrice}</p>
                  <p className='newp'>{newPrice}</p>
                </div>
                <div>
                  <p>{writer}</p>
                  <p className='testiContent'>{testimonial}</p>
                </div>
            </div>
            <div className='blogCardDisplay'>
              <p className='dates'>{date}</p>
              <h5>{title}</h5>
              <p>{report} Resposts | {comment} Comments</p>
              <p>{detail}</p>
            </div>
            <div className='productCardDisplay'>
                <p>{title}</p>
                <p className='newp'>{newPrice}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Card