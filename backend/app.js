const express = require('express')
const app = express();
const errorMiddleware = require('./middlewares/error')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

// availablr routes

// productRoutes
app.use('/api/v1',require('./routes/productRoutes'))

// userRoutes
app.use('/api/v1/user',require('./routes/userRoutes'))

// orderRoutes
app.use('/api/v1/order',require('./routes/orderRoutes'))

// paymentRoutes
app.use('/api/v1',require('./routes/paymentRoutes'))

// middlewares for errors
app.use(errorMiddleware)

module.exports = app;