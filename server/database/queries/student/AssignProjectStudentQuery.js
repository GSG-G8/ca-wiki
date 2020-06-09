const connection = require('../../connection');

const AssignProjectStudentQuery = (data) => {
  const { projectId, student1Id, student2Id, student3Id, student4Id } = data;
  if (student4Id) {
    return connection.query(
      'INSERT INTO student_project (student_id , project_id) VALUES ($2, $1),($3, $1),($4, $1),($5, $1);',
      [projectId, student1Id, student2Id, student3Id, student4Id],
    );
  }
  if (student3Id) {
    return connection.query(
      'INSERT INTO student_project (student_id , project_id) VALUES ($2, $1),($3, $1),($4, $1);',
      [projectId, student1Id, student2Id, student3Id],
    );
  }
  if (student2Id) {
    return connection.query(
      'INSERT INTO student_project (student_id , project_id) VALUES ($2, $1),($3, $1);',
      [projectId, student1Id, student2Id],
    );
  }
  return connection.query(
    'INSERT INTO student_project (student_id , project_id) VALUES ($2, $1);',
    [projectId, student1Id],
  );
};

module.exports = AssignProjectStudentQuery;
