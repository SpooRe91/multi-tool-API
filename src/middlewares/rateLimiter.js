const { request } = require("express");
const rateLimiter = require("express-rate-limit");
const allowed = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://mb-space-explorer.vercel.app",
  "https://cook-blog-d3ed8.web.app",
  "https://mb-cookblog.vercel.app",
  "https://angular-cook-blog.web.app",
  "https://destiny2-bgs.vercel.app",
];
const limiter = rateLimiter({
  max: 100,
  windowMs: 15 * 60 * 1000, // 15 mins
  message: "You can't make any more requests at the moment. Try again later",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  skipFailedRequests: true,
});
module.exports = limiter;
