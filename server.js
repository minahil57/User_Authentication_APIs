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
app.use(cors());
const WebSocket = require('ws');
const http = require('http'); 
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
// const corsOptions = {
//     origin: 'https://wajba.com', // Change this to the allowed origin for your app
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
app.use('/api', userRouter); // Use userRouter directly
// app.use('/api', otpVeri);

//Error Handling
app.use((err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
