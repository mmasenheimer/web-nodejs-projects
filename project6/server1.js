const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Node JS page 1</title>
      <style>
        body {
          background-color: #f0f8ff;
          font-family: Arial, sans-serif;
          font-size: 16px;
          color: #333333;
          padding: 20px;
        }
        h1 {
          color: #0066cc;
        }
        ul {
          background-color: #e6f2ff;
          padding: 10px;
          border-radius: 8px;
        }
        table {
          border-collapse: collapse;
          width: 50%;
          margin-top: 20px;
        }
        table, th, td {
          border: 1px solid #333;
          padding: 8px;
          text-align: center;
        }
        a {
          color: #008000;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to my Node server!!!</h1>
      <p>This paragraph describes how node works...</p>
      
      <ul>
        <li>Learn Node.js</li>
        <li>Javascript</li>
        <li>Random stuff here</li>
      </ul>

      <p>Check out this <a href="#">placeholder link</a> for more info!</p>

      <table>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>Melatonin tablets</td>
          <td>5000</td>
          <td>1 Billion dollars</td>
        </tr>
        <tr>
          <td>Mousepads</td>
          <td>0</td>
          <td>$3</td>
        </tr>
        <tr>
          <td>Nail Clippers</td>
          <td>8</td>
          <td>$4</td>
        </tr>
      </table>
    </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log("Running on localhost:3000");
});
