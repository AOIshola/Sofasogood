const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db-connect');

const errorHandlerMiddleware = require('./middleware/errorHandler');

const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');
const blogRouter = require('./routes/blogRoutes');
const reviewRouter = require('./routes/reviewRoutes');

dotenv.config();
const app = express()

app.use(express.json());
app.use(cors());

app.use(errorHandlerMiddleware);

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlists', wishlistRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/reviews', reviewRouter);

// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(5000, '127.0.0.1', () => {
            console.log('Server running on port 5000...')
        })
    } catch (error) {
        console.log(error);
    }
}

start();