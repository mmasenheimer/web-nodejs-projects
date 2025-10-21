const http = require("http");
const url = require("url");

const submissions = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  const pathname = parsedUrl.pathname;

  res.writeHead(200, { "Content-Type": "text/html" });

  if (pathname === "/" || pathname === "/form") {
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Form webpage with submission!</title>
        <style>
          body {
           font-family: Arial; background-color: #f0f8ff; padding: 20px; 
           }
          input {
           margin: 5px 0; padding: 8px; width: 200px; 
           }
          button {
           padding: 8px 12px; background-color: #007bff; color: white; border: none; cursor: pointer; 
           }
          h2 {
           color: #333; 
           }
        </style>
      </head>
      <body>
        <h1>Submit stuff</h1>
        <form action="/submit" method="GET">
          <label>Name:</label><br>
          <input type="text" name="name" required><br>
          <label>Email:</label><br>
          <input type="email" name="email" required><br><br>
          <button type="submit">Submit</button>
        </form>
      </body>
      </html>
    `);
  } else if (pathname === "/submit") {
    const name = query.name;
    const email = query.email;

    if (name && email) {
      submissions.push({ name, email });
    }

    let summary = "<h2>All Submissions:</h2><ul>";
    for (let i = 0; i < submissions.length; i++) {
      summary +=
        "<li>" + submissions[i].name + " (" + submissions[i].email + ")</li>";
    }
    summary += '</ul><a href="/form">Go Back</a>';

    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Submission Summary</title></head>
      <body style="font-family:Arial; background-color:#eaf4fc; padding:20px;">
        ${summary}
      </body>
      </html>
    `);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(8081, () => {
  console.log("running on localhost:8081/form");
});
