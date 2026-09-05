import readDatabase from '../utils';

export default class StudentsController {
  static getAllStudents(request, response) {
    const database = process.argv[2];

    readDatabase(database)
      .then((students) => {
        const fields = Object.keys(students).sort(
          (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
        );

        const output = ['This is the list of our students'];

        fields.forEach((field) => {
          output.push(
            `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`,
          );
        });

        response.status(200).send(output.join('\n'));
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    const database = process.argv[2];

    readDatabase(database)
      .then((students) => {
        response.status(200).send(`List: ${students[major].join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}
