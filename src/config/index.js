const corseOptions = require('./allowedOrigins').corsOptions;
const cookieParserConfig = require('./cookieParserConfig').cookieParserConfig;
const expressConfig = require('./expressConfig').expressConfig;
const mongoseConfig = require('./mongoseConfig').connecter;
module.exports = { corseOptions, cookieParserConfig, expressConfig, mongoseConfig };
