import React, { useState, useContext, useEffect } from 'react';
import Navs from '../../Navigation/Nav';
import Footer from '../../Footer/footer';
import Card from '../../components/Card';
import { useBlog } from '../../contexts/BlogContext';
import './blogs.css';

function Blogs() {
  const [query, setQuery] = useState('');
  const { blogs, loading, error } = useBlog();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = blogs.filter((blogItem) =>
    blogItem.title.toLowerCase().includes(query.toLowerCase())
  );

  const result = filteredItems.map(
    ({ imageUrl, title, date, repost, comment, content }, index) => (
      <Card
        className="blogCards"
        styles="blogCard"
        key={index}
        date={date}
        img={imageUrl}  // Corrected to match imageUrl from your schema
        title={title}
        report={repost}
        comment={comment}
        detail={content}
      />
    )
  );

  useEffect(() => {
    console.log(blogs);
  }, [])

  return (
    <>
      <Navs />
      <h1>Blogs</h1>
      <center className="MobileSearch">
        <input
          type="text"
          placeholder="Search blog..."
          onChange={handleInputChange}
          value={query}
        />
      </center>
      <div className="blogMainContain">
        <div className="blogLeftDiv">
          <input
            type="text"
            placeholder="Search blog..."
            onChange={handleInputChange}
            value={query}
          />

          <div>
            <h2>TAGS</h2>
            <div>
              <button>Architecture</button>
              <button>Bedroom</button>
              <button>Living room</button>
              <button>Lifestyle</button>
              <button>Design</button>
              <button>Furniture maintenance</button>
              <button>Interior</button>
              <button>Sofa</button>
              <button>Art</button>
            </div>
          </div>
        </div>
        <div className="blogCardContain">
          {loading ? (
            <p>Loading blogs...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            result
          )}
        </div>
      </div>

      <div className="blogDownDiv">
        <h2>TAGS</h2>
        <div>
          <button>Architecture</button>
          <button>Bedroom</button>
          <button>Living room</button>
          <button>Lifestyle</button>
          <button>Design</button>
          <button>Furniture maintenance</button>
          <button>Interior</button>
          <button>Sofa</button>
          <button>Art</button>
        </div>
      </div>

      <Footer />
    </>);
}

export default Blogs;