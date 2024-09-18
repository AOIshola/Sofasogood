import React from 'react'
import './category.css'
import Card from '../../components/Card'
import categoryCardData from '../../db/db.jsx';

function Category() {
  return (
    <>
        <div className='categoryContain'>
            <div className='categoryTexts'>
                <h1>Give your space an awesome makeover</h1>
               
                <div className='how'>
                <p>We have a team of experts available to inspect and make recommendations.</p>
                <a href="#">How does it work?</a>
                </div>
            </div>
            <div className='cardObjects'>

                {categoryCardData.map(
                    ({ img, title, description}, index) => (
                    <Card 
                    styles = "category"
                    // cate={style}
                    key = {index}
                    img = {img}
                    title = {title}
                    desciption={description}
                    
                    />
                    ))} 
            </div>

        </div>
    </>
    
  )
}

export default Category