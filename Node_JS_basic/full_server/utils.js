import fs from 'fs';

export default function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      const lines = data
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .slice(1);

      const students = {};

      lines.forEach((line) => {
        const values = line.split(',');
        const firstName = values[0];
        const field = values[3];

        if (!students[field]) {
          students[field] = [];
        }

        students[field].push(firstName);
      });

      resolve(students);
    });
  });
}
