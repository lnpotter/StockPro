const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const authRoutes = require('./routes/authRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();

mongoose.connect('mongodb+srv://root:sudo@cluster.6wrdzm2.mongodb.net/?retryWrites=true&w=majority&appName=cluster')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));  

app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stock-report', stockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
