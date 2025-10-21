const http = require("http");

const submissions = [];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    // Serve the form
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Login page!</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
          }
          form {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            width: 300px;
          }
          input {
            display: block;
            margin: 10px 0;
            padding: 8px;
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
          }
          button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <h1>Secure Login</h1>
        <form action="/submit" method="POST">
          <label>Username:</label>
          <input type="text" name="username" required>
          <label>Password:</label>
          <input type="password" name="password" required>
          <button type="submit">Submit</button>
        </form>
      </body>
      </html>
    `);
  } else if (req.method === "POST" && req.url === "/submit") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const params = new URLSearchParams(body);
      const username = params.get("username");
      const password = params.get("password");

      submissions.push({ username: username, password: password });

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Parsing submission html</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #e6ffe6;
              padding: 20px;
            }
            h2 { color: #333; }
            a {
              color: #007bff;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <h2>Your information has been received securely.</h2>
          <a href="/">Go Back</a>
        </body>
        </html>
      `);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(8082, () => {
  console.log("Running on localhost:8082");
});
