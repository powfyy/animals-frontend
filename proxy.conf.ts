const config = {
  target: "http://localhost:8080",
  changeOrigin: false,
  secure:false,
  logLevel: 'debug',
};

const PROXY_CONFIG = {
  "/api/*":config
}

module.exports= PROXY_CONFIG
