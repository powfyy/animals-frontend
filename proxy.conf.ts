const config = {
  target: "http://localhost:8080",
  changeOrigin: false,
  secure:false,
  logLevel: 'debug',
};

const minio = {
  target: "http://localhost:9000",
  changeOrigin:false,
  secure:false,
  logLevel:'debug',
};

const PROXY_CONFIG = {
  "/api/*":config,
  "/animal-${animalId}/${photoRef}":minio,
}

module.exports= PROXY_CONFIG
