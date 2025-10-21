const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === "/calculate") {
    const query = parsedUrl.query;
    const num1 = parseFloat(query.num1);
    const num2 = parseFloat(query.num2);
    const operation = query.operation;

    res.writeHead(200, { "Content-Type": "text/plain" });

    if (isNaN(num1) || isNaN(num2)) {
      res.end("Both numbers must be valid");
      return;
    }

    let result;

    if (operation === "add") {
      result = num1 + num2;
    } else if (operation === "subtract") {
      result = num1 - num2;
    } else if (operation === "multiply") {
      result = num1 * num2;
    } else if (operation === "divide") {
      if (num2 === 0) {
        res.end("Can't divide by 0 yo");
        return;
      }
      result = num1 / num2;
    } else {
      res.end(
        "Error: Supported operations are add, subtract, multiply, divide"
      );
      return;
    }

    res.end("Result: " + result);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(8080, () => {
  console.log("Running on localhost:8080");
});
