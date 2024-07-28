require("dotenv").config();
const express = require("express");
const dbService = require("./config/mongoseConfig");
const { auth } = require("./middlewares/authMiddleware");
const { errorHandler } = require("./middlewares/errorHandlerMiddleware");
const cors = require("cors");
const limiter = require("./middlewares/rateLimiter");
const app = express();

dbService.connecter();
require("./config/cookieParserConfig")(app); //cookie parser
app.use(limiter);
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:8080",
            "https://mb-space-explorer.vercel.app",
            "https://mb-space-explorer-dev.vercel.app",
            "https://mb-portfolio-app.vercel.app",
            "https://cook-blog-d3ed8.web.app",
            "https://mb-cookblog.vercel.app",
            "https://angular-cook-blog.web.app",
            "https://destiny2-bgs.vercel.app",
            "https://task-users-list.vercel.app",
        ],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "x-util-key"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);
app.use(auth); //auth middleware
require("./config/expressConfig")(app); //express config
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
