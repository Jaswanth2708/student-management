const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student Management Backend is running!");
});

app.get("/api/students", (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({
        error: "Failed to fetch students"
      });
    }

    res.json(results);
  });
});
app.post("/api/students", (req, res) => {

  const {
    student_id,
    name,
    department,
    image,
    maths,
    physics,
    computer
  } = req.body;

  // Check required fields
  if (
    !student_id ||
    !name ||
    !department ||
    maths === undefined ||
    physics === undefined ||
    computer === undefined
  ) {
    return res.status(400).json({
      error: "All student fields are required"
    });
  }

  // Convert marks to numbers
  const mathsMark = Number(maths);
  const physicsMark = Number(physics);
  const computerMark = Number(computer);

  // Validate marks
  if (
    mathsMark < 0 || mathsMark > 100 ||
    physicsMark < 0 || physicsMark > 100 ||
    computerMark < 0 || computerMark > 100
  ) {
    return res.status(400).json({
      error: "Marks must be between 0 and 100"
    });
  }

  const sql = `
    INSERT INTO students
    (student_id, name, department, image, maths, physics, computer)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    student_id,
    name.trim(),
    department.trim(),
    image || "",
    mathsMark,
    physicsMark,
    computerMark
  ];

  db.query(sql, values, (err, result) => {

    if (err) {

      console.error("Error adding student:", err);

      return res.status(500).json({
        error: "Failed to add student"
      });
    }

    res.status(201).json({
      message: "Student added successfully",
      id: result.insertId
    });

  });
});
app.put("/api/students/:id", (req, res) => {

  const { id } = req.params;

  const {
    student_id,
    name,
    department,
    image,
    maths,
    physics,
    computer
  } = req.body;

  // Check required fields
  if (
    !student_id ||
    !name ||
    !department ||
    maths === undefined ||
    physics === undefined ||
    computer === undefined
  ) {
    return res.status(400).json({
      error: "All student fields are required"
    });
  }

  // Convert marks to numbers
  const mathsMark = Number(maths);
  const physicsMark = Number(physics);
  const computerMark = Number(computer);

  // Validate marks
  if (
    mathsMark < 0 || mathsMark > 100 ||
    physicsMark < 0 || physicsMark > 100 ||
    computerMark < 0 || computerMark > 100
  ) {
    return res.status(400).json({
      error: "Marks must be between 0 and 100"
    });
  }

  const sql = `
    UPDATE students
    SET
      student_id = ?,
      name = ?,
      department = ?,
      image = ?,
      maths = ?,
      physics = ?,
      computer = ?
    WHERE id = ?
  `;

  const values = [
    student_id,
    name.trim(),
    department.trim(),
    image || "",
    mathsMark,
    physicsMark,
    computerMark,
    id
  ];

  db.query(sql, values, (err, result) => {

    if (err) {

      console.error("Error updating student:", err);

      return res.status(500).json({
        error: "Failed to update student"
      });
    }

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: "Student not found"
      });
    }

    res.json({
      message: "Student updated successfully"
    });

  });
});

// DELETE STUDENT

app.delete("/api/students/:id", (req, res) => {

  const { id } = req.params;

  // First delete attendance records
  // belonging to this student

  const deleteAttendanceSql = `
    DELETE FROM attendance
    WHERE student_id = ?
  `;

  db.query(
    deleteAttendanceSql,
    [id],
    (err) => {

      if (err) {

        console.error(
          "Error deleting student attendance:",
          err
        );

        return res.status(500).json({
          error: "Failed to delete student attendance"
        });
      }

      // Now delete the student

      const deleteStudentSql = `
        DELETE FROM students
        WHERE id = ?
      `;

      db.query(
        deleteStudentSql,
        [id],
        (err, result) => {

          if (err) {

            console.error(
              "Error deleting student:",
              err
            );

            return res.status(500).json({
              error: "Failed to delete student"
            });
          }

          if (result.affectedRows === 0) {

            return res.status(404).json({
              error: "Student not found"
            });
          }

          res.json({
            message:
              "Student and attendance records deleted successfully"
          });

        }
      );

    }
  );
});


app.post("/api/attendance", (req, res) => {

  const {
    student_id,
    date,
    status
  } = req.body;

  // Check required fields
  if (!student_id || !date || !status) {
    return res.status(400).json({
      error: "Student ID, date and status are required"
    });
  }

  // Validate status
  if (status !== "Present" && status !== "Absent") {
    return res.status(400).json({
      error: "Status must be Present or Absent"
    });
  }

  const sql = `
    INSERT INTO attendance
    (student_id, date, status)
    VALUES (?, ?, ?)
  `;

  const values = [
    student_id,
    date,
    status
  ];

  db.query(sql, values, (err, result) => {

    if (err) {

      console.error(
        "Error adding attendance:",
        err
      );

      return res.status(500).json({
        error: "Failed to add attendance"
      });
    }

    res.status(201).json({
      message: "Attendance added successfully",
      id: result.insertId
    });

  });
});
app.get("/api/attendance", (req, res) => {

  const sql = `
    SELECT
      attendance.id,
      attendance.student_id,
      students.student_id AS student_code,
      students.name,
      attendance.date,
      attendance.status
    FROM attendance
    JOIN students
      ON attendance.student_id = students.id
    ORDER BY attendance.date DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {

      console.error(
        "Error fetching attendance:",
        err
      );

      return res.status(500).json({
        error: "Failed to fetch attendance"
      });
    }

    res.json(results);
  });
});
app.get("/api/attendance/summary", (req, res) => {

  const sql = `
    SELECT
      students.id,
      students.student_id,
      students.name,

      COUNT(attendance.id) AS total_days,

      SUM(
        CASE
          WHEN attendance.status = 'Present'
          THEN 1
          ELSE 0
        END
      ) AS present_days,

      SUM(
        CASE
          WHEN attendance.status = 'Absent'
          THEN 1
          ELSE 0
        END
      ) AS absent_days

    FROM students

    LEFT JOIN attendance
      ON students.id = attendance.student_id

    GROUP BY
      students.id,
      students.student_id,
      students.name

    ORDER BY students.id;
  `;

  db.query(sql, (err, results) => {

    if (err) {

      console.error(
        "Error fetching attendance summary:",
        err
      );

      return res.status(500).json({
        error: "Failed to fetch attendance summary"
      });
    }

    const summary = results.map((student) => {

      const totalDays = Number(student.total_days);
      const presentDays = Number(student.present_days);

      const percentage =
        totalDays === 0
          ? 0
          : ((presentDays / totalDays) * 100).toFixed(1);

      return {
        ...student,
        total_days: totalDays,
        present_days: presentDays,
        absent_days: Number(student.absent_days),
        percentage: Number(percentage)
      };
    });

    res.json(summary);
  });
});
// UPDATE ATTENDANCE

app.put("/api/attendance/:id", (req, res) => {

  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      error: "Status is required"
    });
  }

  const sql = `
    UPDATE attendance
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, req.params.id],
    (err, result) => {

      if (err) {

        console.error(
          "Error updating attendance:",
          err
        );

        return res.status(500).json({
          error: "Failed to update attendance"
        });
      }

      if (result.affectedRows === 0) {

        return res.status(404).json({
          error: "Attendance record not found"
        });
      }

      res.json({
        message: "Attendance updated successfully"
      });

    }
  );
});
// DELETE ATTENDANCE

app.delete("/api/attendance/:id", (req, res) => {

  const sql = `
    DELETE FROM attendance
    WHERE id = ?
  `;

  db.query(
    sql,
    [req.params.id],
    (err, result) => {

      if (err) {

        console.error(
          "Error deleting attendance:",
          err
        );

        return res.status(500).json({
          error: "Failed to delete attendance"
        });
      }

      if (result.affectedRows === 0) {

        return res.status(404).json({
          error: "Attendance record not found"
        });
      }

      res.json({
        message: "Attendance deleted successfully"
      });

    }
  );
});
// GET ATTENDANCE FOR ONE STUDENT

app.get("/api/attendance/student/:studentId", (req, res) => {

  const sql = `
    SELECT
      attendance.id,
      students.student_id AS student_code,
      students.name,
      attendance.date,
      attendance.status
    FROM attendance
    JOIN students
      ON attendance.student_id = students.id
    WHERE attendance.student_id = ?
    ORDER BY attendance.date DESC
  `;

  db.query(
    sql,
    [req.params.studentId],
    (err, results) => {

      if (err) {

        console.error(
          "Error fetching student attendance:",
          err
        );

        return res.status(500).json({
          error: "Failed to fetch student attendance"
        });
      }

      res.json(results);
    }
  );
});


// REGISTER API

app.post("/api/register", (req, res) => {

  const { username, password, role } = req.body;

  // Check required fields
  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required"
    });
  }

  // Check whether username already exists
  const checkSql = `
    SELECT id
    FROM users
    WHERE username = ?
  `;

  db.query(
    checkSql,
    [username],
    (err, results) => {

      if (err) {

        console.error(
          "Error checking username:",
          err
        );

        return res.status(500).json({
          error: "Registration failed"
        });
      }

      if (results.length > 0) {

        return res.status(409).json({
          error: "Username already exists"
        });
      }

      // Insert new user
      const insertSql = `
        INSERT INTO users
        (username, password, role)
        VALUES (?, ?, ?)
      `;

      const values = [
        username.trim(),
        password,
        role || "user"
      ];

      db.query(
        insertSql,
        values,
        (err, result) => {

          if (err) {

            console.error(
              "Error creating user:",
              err
            );

            return res.status(500).json({
              error: "Registration failed"
            });
          }

          res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId
          });

        }
      );

    }
  );
});


// LOGIN API

app.post("/api/login", (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required"
    });
  }

  const sql = `
    SELECT id, username, role
    FROM users
    WHERE username = ? AND password = ?
  `;

  db.query(
    sql,
    [username, password],
    (err, results) => {

      if (err) {

        console.error(
          "Login error:",
          err
        );

        return res.status(500).json({
          error: "Login failed"
        });
      }

      if (results.length === 0) {

        return res.status(401).json({
          error: "Invalid username or password"
        });
      }

      res.json({
        message: "Login successful",
        user: results[0]
      });

    }
  );
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});