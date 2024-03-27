const express = require("express");
const uuid = require("uuid");
const router = express.Router();

const StudentDal = require("../services/pg.students.dal.js");

router.get("/", async (req, res) => {
  try {
    let theStudent = await StudentDal.getStudents();
    if (DEBUG) console.table(theStudent);
    res.render("Students", { theStudent });
  } catch (err) {
    if (DEBUG) console.log(err);
    // log this error to an error log file.
    res.render("err503");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let aStudent = await loginsDal.getStudentById(req.params.id);
    if (aStudent === undefined) {
      res.render("norecord");
    } else {
      if (DEBUG) console.table(aStudent);
      res.render("Student", { aStudent });
    }
  } catch (err) {
    res.render("err503");
  }
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("student.Edit : " + req.params.id);
  res.render("editStudent.ejs", {
    name: req.query.name,
    age: req.query.age,
    grade: req.query.grade,
    theId: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("student.Delete : " + req.params.id);
  res.render("deleteStudent.ejs", {
    username: req.query.name,
    theId: req.params.id,
  });
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("students.POST");
  try {
    let result = await StudentDal.addStudent(
      req.body.name,
      req.body.age,
      req.body.grade,
      uuid.v4()
    );
    if (DEBUG) console.log("result: " + result);
    res.redirect("/students/");
  } catch (err) {
    if (DEBUG) console.log(err);
    // log this error to an error log file.
    res.render("err503");
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("students.PATCH: " + req.params.id);
  try {
    await StudentDal.updateStudent(req.params.id, req.body.name, req.body.age);
    res.redirect("/students/");
  } catch (err) {
    if (DEBUG) console.log(err);
    res.render("err503");
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("students.DELETE: " + req.params.id);
  try {
    await StudentDal.deleteStudent(req.params.id);
    res.redirect("/students/");
  } catch (err) {
    res.render("err503");
  }
});

module.exports = router;
