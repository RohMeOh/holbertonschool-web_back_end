const fs = require('fs');

function countStudents(path) {
  let data;

  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = data
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const students = lines.slice(1);

  console.log(`Number of students: ${students.length}`);

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

  Object.keys(fields).forEach((field) => {
    console.log(
      `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`,
    );
  });
}

module.exports = countStudents;
