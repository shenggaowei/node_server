const tsConfigPaths = require("tsconfig-paths");

const baseUrl = "./out"; 

tsConfigPaths.register({
  cwd: process.cwd(),
  baseUrl,
  paths: {
    "@/*": ["./*"]
  }
});
