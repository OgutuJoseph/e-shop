const express = require('express');
// const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

/** connect database */
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to mongodb.')
    } catch (error) {
        // handleError(error)
        throw error;
    }
}

mongoose.connection.on('connected', () => {
    console.log('Database connected.');
})
mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected.');
})


/** middlewares */
// app.use(cors());
app.use(express.json());


/** import routes */
const adminsRoute = require('./routes/admin');
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');
const cartsRoute = require('./routes/carts');
const ordersRoute = require('./routes/orders');


/** routes */
app.use('/api/admins', adminsRoute);
app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/carts', cartsRoute);
app.use('/api/orders', ordersRoute);

/** connect app */
const port = process.env.PORT;
app.listen(port, () => {
    connect();
    console.log(`Server has started on port ${port}`);
});