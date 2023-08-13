require("dotenv").config();
require('./config/dbconnection');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const userRouter = require('./routes/userRoute');
 
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',userRouter);
app.use(cors());

//Error Handling

app.use((err,_req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message:err.message,
    });
});
app.listen(3000, ()=> console.log('Server is running on port 3000'));