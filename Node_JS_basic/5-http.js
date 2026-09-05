const http = require('http');
const fs = require('fs');

const database = process.argv[2];

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    fs.readFile(database, 'utf8', (error, data) => {
      if (error) {
        res.end('This is the list of our students\nCannot load the database');
        return;
      }

      const lines = data
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const students = lines.slice(1);
      const fields = {};

      students.forEach((student) => {
        const values = student.split(',');
        const firstName = values[0];
        const field = values[3];

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstName);
      });

      let output = 'This is the list of our students\n';
      output += `Number of students: ${students.length}\n`;

      Object.keys(fields).forEach((field, index) => {
        output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;

        if (index < Object.keys(fields).length - 1) {
          output += '\n';
        }
      });

      res.end(output);
    });

    return;
  }

  res.end();
});

app.listen(1245);

module.exports = app;
