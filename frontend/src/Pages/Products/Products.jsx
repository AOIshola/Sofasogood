import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navs from '../../Navigation/Nav';
import Footer from '../../Footer/footer';
import './products.css';
import { useProduct } from '../../contexts/ProductContext';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';

function Products() {
  const { products, loading, error } = useProduct();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Navs />
      <h1>Products</h1>
      <div className="productsCard">
        {loading ? <p>Loading...</p>
          : (products && products.map(({ _id, imageUrl, name, price }) => (
            <Link to={`/product/${_id}`} key={_id} className="cardLink">
              <Card
                className="featureDealCard"
                styles="product"
                img={imageUrl}
                title={name}
                newPrice={price}
              />
            </Link>
          )) || <p>{error}</p>)}
      </div>
      <Pagination />
      <Footer />
    </>
  );
}

export default Products;