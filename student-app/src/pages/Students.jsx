
import { useState } from "react";
import StudentCard from "../components/studentCard";
import { useStudents } from "../context/StudentContext";

function Students() {

  const {
    students,
    updateStudent: updateStudentAPI,
    deleteStudent: deleteStudentAPI,
    loading
  } = useStudents();

  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [maths, setMaths] = useState("");
  const [physics, setPhysics] = useState("");
  const [computer, setComputer] = useState("");

  // Department filter
  const [departmentFilter, setDepartmentFilter] = useState("All");


  // =========================
  // DELETE STUDENT
  // =========================

  const deleteStudent = (id) => {
    setDeleteId(id);
  };


  const confirmDelete = async () => {

    if (deleteId === null) {
      return;
    }

    await deleteStudentAPI(deleteId);

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

    setDepartment(student.department || "");

    setMaths(student.marks.maths);

    setPhysics(student.marks.physics);

    setComputer(student.marks.computer);
  };


  // =========================
  // UPDATE STUDENT
  // =========================

  const updateStudent = async () => {

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


    if (
      Number(maths) < 0 ||
      Number(maths) > 100
    ) {
      alert("Maths marks must be between 0 and 100");
      return;
    }


    if (
      Number(physics) < 0 ||
      Number(physics) > 100
    ) {
      alert("Physics marks must be between 0 and 100");
      return;
    }


    if (
      Number(computer) < 0 ||
      Number(computer) > 100
    ) {
      alert("Computer marks must be between 0 and 100");
      return;
    }


    // Find the existing student
    const student = students.find(
      (student) => student.id === editingId
    );

    if (!student) {
      alert("Student not found");
      return;
    }


    // Send updated data to backend
    await updateStudentAPI(editingId, {

      student_id: student.studentId,

      name: name.trim(),

      department: department.trim(),

      image: student.image || "",

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

    setEditingId(null);

    setName("");

    setDepartment("");

    setMaths("");

    setPhysics("");

    setComputer("");
  };


  // =========================
  // GET DEPARTMENTS
  // =========================

  const departments = [
    ...new Set(
      students
        .map((student) => student.department)
        .filter((department) => department)
    )
  ];


  // =========================
  // FILTER STUDENTS
  // =========================

  const filteredStudents =
    departmentFilter === "All"
      ? students
      : students.filter(
          (student) =>
            student.department === departmentFilter
        );


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="page">

        <h1>Students</h1>

        <p>Loading students...</p>

      </div>
    );
  }


  return (

    <div className="page">

      <h1>Students</h1>

      <p>
        View and manage all students here.
      </p>


      {/* =========================
          DEPARTMENT FILTER
      ========================= */}

      <div className="department-filter">

        <label>
          Department:
        </label>

        <select
          value={departmentFilter}
          onChange={(e) =>
            setDepartmentFilter(e.target.value)
          }
        >

          <option value="All">
            All Departments
          </option>

          {departments.map((department) => (

            <option
              key={department}
              value={department}
            >
              {department}
            </option>

          ))}

        </select>

      </div>


      {/* =========================
          EDIT FORM
      ========================= */}

      {editingId !== null && (

        <div className="form-container">

          <h2>Edit Student</h2>


          {/* Student Name */}

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />


          {/* Department */}

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
          />


          {/* Maths */}

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


          {/* Physics */}

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


          {/* Computer */}

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


          {/* Update */}

          <button onClick={updateStudent}>
            Update Student
          </button>


          {/* Cancel */}

          <button
            className="cancel-button"
            onClick={clearForm}
          >
            Cancel
          </button>

        </div>

      )}


      {/* =========================
          STUDENT CARDS
      ========================= */}

      <div className="students-container">

        {filteredStudents.length === 0 ? (

          <p className="no-students">
            No students found.
          </p>

        ) : (

          filteredStudents.map((student) => (

            <StudentCard
              key={student.id}
              student={student}
              onDelete={deleteStudent}
              onEdit={editStudent}
            />

          ))

        )}

      </div>


      {/* =========================
          DELETE CONFIRMATION
      ========================= */}

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

export default Students;

