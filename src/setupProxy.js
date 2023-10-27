// eslint-disable-next-line no-undef
// const { createProxyMiddleware } = require("http-proxy-middleware");

// const router = {
//   "/api": process.env.REACT_APP_BACKEND_PORT + "/api",
// };

// // eslint-disable-next-line no-undef
// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: process.env.REACT_APP_BACKEND_PORT + "/api",
//       changeOrigin: true,
//       secure: false,
//       pathRewrite: {
//         "^/api": "",
//       },
//       onProxyReq: function (proxyReq, req, res) {
//         proxyReq.removeHeader("Origin");
//       },
//       router,
//       logLevel: "debug",
//     })
//   );
// };
