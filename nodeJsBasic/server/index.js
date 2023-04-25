const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log("Server request");
  console.log("req.url, req.method", req.url, req.method);

  // res.setHeader("Content-Type", "text/plain");
  // res.write("Hello server");
  // res.end();

  res.setHeader("Content-Type", "application/json");
  const data = JSON.stringify([
    { name: "john1", age: 18 },
    { name: "john2", age: 18 },
  ]);

  res.end(data);
});

server.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
