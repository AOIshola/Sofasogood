import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/blogs/');
            setBlogs(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Network error');
            setLoading(false);
        }
    };

    const fetchBlogById = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/blogs/${id}`);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Network error');
            setLoading(false);
            throw err;
        }
    };

    const createBlog = async (blogData) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/blogs', blogData);
            setBlogs((prevBlogs) => [...prevBlogs, response.data]);
            setLoading(false);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Network error');
            setLoading(false);
            throw err;
        }
    };

    const updateBlog = async (id, blogData) => {
        try {
            setLoading(true);
            const response = await axios.put(`/api/blogs/${id}`, blogData);
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) => (blog._id === id ? response.data : blog))
            );
            setLoading(false);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Network error');
            setLoading(false);
            throw err;
        }
    };

    const deleteBlog = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`/api/blogs/${id}`);
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
            setLoading(false);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Network error');
            setLoading(false);
            throw err;
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <BlogContext.Provider
            value={{
                blogs,
                loading,
                error,
                fetchBlogs,
                fetchBlogById,
                createBlog,
                updateBlog,
                deleteBlog,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => { return useContext(BlogContext) };

export default BlogContext;