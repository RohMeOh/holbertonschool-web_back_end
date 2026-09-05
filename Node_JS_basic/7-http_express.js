const express = require('express');
const fs = require('fs');

const app = express();
const database = process.argv[2];

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  fs.readFile(database, 'utf8', (error, data) => {
    res.type('text/plain');

    if (error) {
      res.send('This is the list of our students\nCannot load the database');
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

    const fieldNames = Object.keys(fields);

    fieldNames.forEach((field, index) => {
      output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;

      if (index < fieldNames.length - 1) {
        output += '\n';
      }
    });

    res.send(output);
  });
});

app.listen(1245);

module.exports = app;
