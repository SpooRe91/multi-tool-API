const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
  max: 100,
  windowMs: 5 * 60 * 1000, // 5 mins
  message: "You can't make any more requests at the moment. Try again later",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  skipFailedRequests: true,
});
module.exports = limiter;
