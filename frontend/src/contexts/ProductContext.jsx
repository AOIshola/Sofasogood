import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/products/?page=${page}`);
            setProducts(response.data.products);
            setPage(response.data.currentPage);
            setNumPages(response.data.totalPages);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products.');
            setLoading(false);
        }
    };

    const fetchProductById = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(response.data.product);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch product.');
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity) => {
        try {
            const response = await axios.post('http://localhost:5000/api/cart', {
                productId,
                quantity,
            });
            return response.data;
        } catch (err) {
            setError('Failed to add product to cart.');
            throw err;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const nextPage = (e) => {
        e.preventDefault();
        page < numPages ? setPage(prev => prev + 1) : setPage(1);
    }

    const prevPage = (e) => {
        e.preventDefault();
        console.log(page)
        page > 1 ? setPage(prev => prev - 1) : setPage(numPages);
    }

    const gotoPage = (e, page) => {
        e.preventDefault();
        setPage(page);
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                product,
                loading,
                error,
                fetchProducts,
                fetchProductById,
                addToCart,
                page,
                numPages,
                gotoPage,
                prevPage,
                nextPage,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    return useContext(ProductContext);
};

export default ProductContext;