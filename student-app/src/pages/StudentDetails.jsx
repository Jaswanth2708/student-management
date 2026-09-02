import { useParams, Link } from "react-router-dom";
import { useStudents } from "../context/StudentContext";

function StudentDetails() {

  // Get the student ID from the URL
  const { id } = useParams();

  // Get students from StudentContext
  const { students } = useStudents();

  // Find the student
  const student = students.find(
    (student) => student.id === Number(id)
  );

  // If student doesn't exist
  if (!student) {
    return (
      <div className="page">

        <h1>Student Not Found</h1>

        <p>
          The student you are looking for does not exist.
        </p>

        <Link to="/students">
          ← Back to Students
        </Link>

      </div>
    );
  }

  // Calculate total
  const total =
    student.marks.maths +
    student.marks.physics +
    student.marks.computer;

  // Calculate percentage
  const percentage = (total / 300) * 100;

  // Calculate result
  const result =
    student.marks.maths >= 35 &&
    student.marks.physics >= 35 &&
    student.marks.computer >= 35
      ? "PASS"
      : "FAIL";

      const getGrade = (marks) => {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  if (marks >= 35) return "E";
  return "F";
};

  return (
    <div className="page">

      <h1>Student Details</h1>

    <div className="student-details-card">

  {/* STUDENT IMAGE */}

  {student.image ? (
    <img
      src={student.image}
      alt={student.name}
      className="details-student-image"
    />
  ) : (
    <div className="details-image-placeholder">
      👤
    </div>
  )}

  <h2>{student.name}</h2>

  <p className="student-id">
  <strong>Student ID:</strong>{" "}
  {student.studentId || "Not assigned"}
</p>

        <p>
          <strong>Department:</strong>{" "}
          {student.department || "Not specified"}
        </p>

        <hr />

       <p>
  <strong>Maths:</strong>{" "}
  {student.marks.maths}
  {" — "}
  <strong>Grade: {getGrade(student.marks.maths)}</strong>
</p>

 <p>
  <strong>Physics:</strong>{" "}
  {student.marks.physics}
  {" — "}
  <strong>Grade: {getGrade(student.marks.physics)}</strong>
</p>
      <p>
  <strong>Computer Science:</strong>{" "}
  {student.marks.computer}
  {" — "}
  <strong>Grade: {getGrade(student.marks.computer)}</strong>
</p>

        <hr />

        <p>
          <strong>Total:</strong> {total} / 300
        </p>

        <p>
          <strong>Percentage:</strong>{" "}
          {percentage.toFixed(2)}%
        </p>

        <p>
          <strong>Result:</strong>{" "}
          <span
            className={
              result === "PASS"
                ? "pass-result"
                : "fail-result"
            }
          >
            {result}
          </span>
        </p>

        <Link
          to="/students"
          className="back-button"
        >
          ← Back to Students
        </Link>
<button
  className="print-button"
  onClick={() => window.print()}
>
  🖨️ Print Report
</button>
      </div>

    </div>
  );
}

export default StudentDetails;