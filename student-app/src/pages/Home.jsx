import { useState } from "react";
import StudentCard from "../components/studentCard";
import { useStudents } from "../context/StudentContext";

function Home() {

 const {
  students,
  addStudent: addStudentToBackend,
  updateStudent: updateStudentToBackend,
  deleteStudent: deleteStudentFromBackend
} = useStudents();

  // =========================
  // FORM STATES
  // =========================

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState("");
  const [maths, setMaths] = useState("");
  const [physics, setPhysics] = useState("");
  const [computer, setComputer] = useState("");

  const [editingId, setEditingId] = useState(null);
const [deleteId, setDeleteId] = useState(null);
  // =========================
  // SEARCH / SORT / THEME
  // =========================

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [darkMode, setDarkMode] = useState(false);

  // =========================
  // DASHBOARD CALCULATIONS
  // =========================

  const totalStudents = students.length;

  const passStudents = students.filter(
    (student) =>
      student.marks.maths >= 35 &&
      student.marks.physics >= 35 &&
      student.marks.computer >= 35
  ).length;

  const failStudents = totalStudents - passStudents;

  const averagePercentage =
    totalStudents === 0
      ? "0.0"
      : (
          students.reduce((sum, student) => {
            const total =
              student.marks.maths +
              student.marks.physics +
              student.marks.computer;

            return sum + total / 3;
          }, 0) / totalStudents
        ).toFixed(1);

  // =========================
  // IMAGE UPLOAD
  // =========================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // =========================
  // ADD STUDENT
  // =========================

  const addStudent = () => {

    if (
      name.trim() === "" ||
      department.trim() === "" ||
      maths === "" ||
      physics === "" ||
      computer === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (Number(maths) < 0 || Number(maths) > 100) {
      alert("Maths marks must be between 0 and 100");
      return;
    }

    if (Number(physics) < 0 || Number(physics) > 100) {
      alert("Physics marks must be between 0 and 100");
      return;
    }

    if (Number(computer) < 0 || Number(computer) > 100) {
      alert("Computer marks must be between 0 and 100");
      return;
    }

    const newStudent = {

      id: Date.now(),

      studentId: `STU${String(
        students.length + 1
      ).padStart(3, "0")}`,

      name: name.trim(),

      department: department.trim(),

      image: image,

      marks: {
        maths: Number(maths),
        physics: Number(physics),
        computer: Number(computer)
      }
    };

   addStudentToBackend({
  student_id: newStudent.studentId,
  name: newStudent.name,
  department: newStudent.department,
  maths: newStudent.marks.maths,
  physics: newStudent.marks.physics,
  computer: newStudent.marks.computer
});

clearForm();
  };

  // =========================
  // DELETE STUDENT
  // =========================

const deleteStudent = (id) => {
  setDeleteId(id);
};

const confirmDelete = async () => {
  await deleteStudentFromBackend(deleteId);

  setDeleteId(null);
};

const cancelDelete = () => {
  setDeleteId(null);
};

  // =========================
  // START EDIT
  // =========================

  const editStudent = (student) => {

    setEditingId(student.id);

    setName(student.name);

    setDepartment(
      student.department || ""
    );

    setImage(
      student.image || ""
    );

    setMaths(
      student.marks.maths
    );

    setPhysics(
      student.marks.physics
    );

    setComputer(
      student.marks.computer
    );
  };

  // =========================
  // UPDATE STUDENT
  // =========================

  const updateStudent = () => {

    if (
      name.trim() === "" ||
      department.trim() === "" ||
      maths === "" ||
      physics === "" ||
      computer === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (Number(maths) < 0 || Number(maths) > 100) {
      alert("Maths marks must be between 0 and 100");
      return;
    }

    if (Number(physics) < 0 || Number(physics) > 100) {
      alert("Physics marks must be between 0 and 100");
      return;
    }

    if (Number(computer) < 0 || Number(computer) > 100) {
      alert("Computer marks must be between 0 and 100");
      return;
    }

    const updatedStudents = students.map(
      (student) => {

        if (student.id === editingId) {

          return {
            ...student,

            name: name.trim(),

            department: department.trim(),

            image: image,

            marks: {
              maths: Number(maths),
              physics: Number(physics),
              computer: Number(computer)
            }
          };
        }

        return student;
      }
    );

    updateStudentToBackend(editingId, {
  student_id: students.find(
    (student) => student.id === editingId
  ).studentId,

  name: name.trim(),

  department: department.trim(),

  maths: Number(maths),

  physics: Number(physics),

  computer: Number(computer)
});

clearForm();
  };

  // =========================
  // CLEAR FORM
  // =========================

  const clearForm = () => {

    setName("");

    setDepartment("");

    setImage("");

    setMaths("");

    setPhysics("");

    setComputer("");

    setEditingId(null);
  };

  // =========================
  // SEARCH
  // =========================

  const filteredStudents =
    students.filter((student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // =========================
  // SORT
  // =========================

  const sortedStudents =
    [...filteredStudents].sort((a, b) => {

      if (sortBy === "nameAsc") {

        return a.name.localeCompare(
          b.name
        );
      }

      if (sortBy === "nameDesc") {

        return b.name.localeCompare(
          a.name
        );
      }

      const percentageA =
        (
          a.marks.maths +
          a.marks.physics +
          a.marks.computer
        ) / 3;

      const percentageB =
        (
          b.marks.maths +
          b.marks.physics +
          b.marks.computer
        ) / 3;

      if (sortBy === "highest") {

        return percentageB - percentageA;
      }

      if (sortBy === "lowest") {

        return percentageA - percentageB;
      }

      return 0;
    });

  // =========================
  // JSX
  // =========================
// =========================
// EXPORT STUDENTS TO CSV
// =========================

const exportStudents = () => {

  if (students.length === 0) {
    alert("No students to export");
    return;
  }

  const headers = [
    "Student ID",
    "Name",
    "Department",
    "Maths",
    "Physics",
    "Computer",
    "Total",
    "Percentage",
    "Result"
  ];

  const rows = students.map((student) => {

    const total =
      student.marks.maths +
      student.marks.physics +
      student.marks.computer;

    const percentage = (total / 3).toFixed(2);

    const result =
      student.marks.maths >= 35 &&
      student.marks.physics >= 35 &&
      student.marks.computer >= 35
        ? "PASS"
        : "FAIL";

    return [
      student.studentId || "",
      student.name,
      student.department || "",
      student.marks.maths,
      student.marks.physics,
      student.marks.computer,
      total,
      percentage,
      result
    ];
  });

  const csvContent = [
    headers,
    ...rows
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "students.csv";

  link.click();

  URL.revokeObjectURL(url);
};
  return (

    <div
      className={
        darkMode
          ? "app dark"
          : "app"
      }
    >

      {/* =========================
          HEADER
      ========================= */}

      <div className="header">

        <h1>
          Student Results
        </h1>

        <button
          className="theme-button"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode
            ? "☀️ Light"
            : "🌙 Dark"}
        </button>

      </div>


      {/* =========================
          DASHBOARD
      ========================= */}

      <div className="dashboard">

        <div className="dashboard-card total">

          <h3>
            {totalStudents}
          </h3>

          <p>
            Total Students
          </p>

        </div>


        <div className="dashboard-card pass">

          <h3>
            {passStudents}
          </h3>

          <p>
            Pass
          </p>

        </div>


        <div className="dashboard-card fail">

          <h3>
            {failStudents}
          </h3>

          <p>
            Fail
          </p>

        </div>


        <div className="dashboard-card average">

          <h3>
            {averagePercentage}%
          </h3>

          <p>
            Average
          </p>

        </div>
        <button
  className="export-button"
  onClick={exportStudents}
>
  📥 Export Students
</button>

      </div>


      {/* =========================
          SEARCH AND SORT
      ========================= */}

      <div className="search-container">

        <input
          type="text"
          placeholder="🔍 Search Student..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >

          <option value="default">
            Default
          </option>

          <option value="highest">
            Highest Percentage
          </option>

          <option value="lowest">
            Lowest Percentage
          </option>

          <option value="nameAsc">
            Name A → Z
          </option>

          <option value="nameDesc">
            Name Z → A
          </option>

        </select>

      </div>


      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      <div className="form-container">

        <h2>
          {editingId === null
            ? "Add Student"
            : "Edit Student"}
        </h2>


        {/* NAME */}

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />


        {/* DEPARTMENT */}

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        />


        {/* IMAGE */}

        <label className="image-label">
          Student Picture
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />



        {/* MATHS */}

        <input
          type="number"
          placeholder="Maths"
          min="0"
          max="100"
          value={maths}
          onChange={(e) =>
            setMaths(e.target.value)
          }
        />


        {/* PHYSICS */}

        <input
          type="number"
          placeholder="Physics"
          min="0"
          max="100"
          value={physics}
          onChange={(e) =>
            setPhysics(e.target.value)
          }
        />


        {/* COMPUTER */}

        <input
          type="number"
          placeholder="Computer"
          min="0"
          max="100"
          value={computer}
          onChange={(e) =>
            setComputer(e.target.value)
          }
        />


        {/* BUTTONS */}

        {editingId === null ? (

          <button
            onClick={addStudent}
          >
            Add Student
          </button>

        ) : (

          <>

            <button
              onClick={updateStudent}
            >
              Update Student
            </button>

            <button
              className="cancel-button"
              onClick={clearForm}
            >
              Cancel
            </button>

          </>

        )}

      </div>


      {/* =========================
          STUDENT CARDS
      ========================= */}

      <div className="students-container">

        {sortedStudents.length === 0 ? (

          <p className="no-students">
            🔍 No students found
          </p>

        ) : (

          sortedStudents.map(
            (student) => (

              <StudentCard
                key={student.id}
                student={student}
                onDelete={deleteStudent}
                onEdit={editStudent}
              />

            )
          )

        )}

      </div>
    {deleteId !== null && (
      <div className="delete-overlay">

        <div className="delete-popup">

          <div className="delete-icon">
            ⚠️
          </div>

          <h2>Delete Student?</h2>

          <p>
            Are you sure you want to delete this student?
          </p>

          <div className="delete-popup-buttons">

            <button
              className="delete-cancel"
              onClick={cancelDelete}
            >
              Cancel
            </button>

            <button
              className="delete-confirm"
              onClick={confirmDelete}
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    )}

    </div>
  );
}

export default Home;