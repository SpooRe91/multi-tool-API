require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dbService = require('./config/mongoseConfig');
const corsOptions = require('./config/allowedOrigins');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');
const limiter = require('./middlewares/rateLimiter');

dbService.connecter(); // Database connect
require('./config/cookieParserConfig')(app); //cookie parser
app.use(limiter);
app.use(cors(corsOptions));
app.use(auth); //auth middleware
require('./config/expressConfig')(app); //express config
app.use(errorHandler); //error handler

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error.message);
    }
    console.log(`"Cook-blog API" listening to port http://localhost:${process.env.PORT}`);
    console.log(
        `Cook-blog React APP and REST API documentation is available at: https://github.com/SpooRe91/react-cook-server/blob/main/README.md`
    );
});
