const dal = require("./pg.auth_db");

// query to get all students
async function getStudents() {
  const sql = `SELECT * FROM public."students"`;

  try {
    let results = await dal.query(sql);
    return results.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// query to search for a student using their id
async function getStudentById(id) {
  const sql = `SELECT * FROM public."students" WHERE id = $1`;

  try {
    let results = await dal.query(sql, [id]);
    return results.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// query to add a new student
async function addStudent(name, age, grade) {
  const sql = `INSERT INTO public."students" (name, age, grade) VALUES ($1, $2, $3) RETURNING *`;

  try {
    let results = await dal.query(sql, [name, age, grade]);
    return results.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// query to delete a student using their id
async function deleteStudent(id) {
  const sql = `DELETE FROM public."students" WHERE id = $1`;

  try {
    let results = await dal.query(sql, [id]);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// query to update a students information
async function updateStudent(id, name, age, grade) {
  const sql = `UPDATE public."students" SET name = $1, age = $2, grade = $3 WHERE id = $4`;

  try {
    let results = await dal.query(sql, [name, age, grade, id]);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
