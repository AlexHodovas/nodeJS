const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log("Server request");
  console.log("req.url, req.method", req.url, req.method);
  console.log("__dirname", __dirname);

  res.setHeader("Content-Type", "text/html");
  const createPath = (page) => path.resolve(__dirname, "", `${page}.html`);
  let basePath = "";

  switch (req.url) {
    case "/":
    case "/home":
      basePath = createPath("page1");
      res.statusCode = 200;
      break;

    case "/page2":
      basePath = createPath("page2");
      res.statusCode = 200;
      break;

    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/page2");
      res.end();
      break;

    default:
      basePath = createPath("error");
      res.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
