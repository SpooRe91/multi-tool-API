const cookieParser = require('cookie-parser');

exports.cookieParserConfig = (app) => {
    app.use(cookieParser());
};
