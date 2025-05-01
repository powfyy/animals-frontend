const config = {
  target: "http://localhost:8080/api",
  changeOrigin: false,
  secure:false,
  logLevel: 'debug',
};

const minio = {
  target: "http://localhost:9000",
  changeOrigin:false,
  secuer:false,
  logLevel:'debug',
};

const PROXY_CONFIG = {
  "/api/*":config,
  "/${petId}-${petType}/${photoRef}":minio,
}

module.exports= PROXY_CONFIG
