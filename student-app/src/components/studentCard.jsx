import { Link } from "react-router-dom";

function StudentCard({
  student,
  onDelete,
  onEdit
}) {
  return (
    <div className="student-card">

      {/* STUDENT IMAGE */}

      {student.image ? (
        <img
          src={student.image}
          alt={student.name}
          className="student-image"
        />
      ) : (
        <div className="student-image-placeholder">
          👤
        </div>
      )}

      {/* STUDENT NAME */}

      <h2>{student.name}</h2>

      {/* STUDENT ID */}

      <p className="student-id-card">
        <strong>ID:</strong>{" "}
        {student.studentId || "Not assigned"}
      </p>

      {/* DEPARTMENT */}

      <p>
        Department:{" "}
        {student.department || "Not specified"}
      </p>

      {/* VIEW DETAILS BUTTON */}

      <Link
        to={`/students/${student.id}`}
        className="details-button"
      >
        View Details
      </Link>

      {/* EDIT AND DELETE BUTTONS */}

      <div className="card-buttons">

        <button
          className="edit-button"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default StudentCard;