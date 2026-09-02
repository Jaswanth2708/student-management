import { useEffect, useState } from "react";

function Attendance() {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
const [summary, setSummary] = useState([]);
const [studentAttendance, setStudentAttendance] = useState([]);
const [selectedStudentView, setSelectedStudentView] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  // Get students
  useEffect(() => {

    fetch("http://localhost:5000/api/students")

      .then((response) => response.json())

      .then((data) => {
        setStudents(data);
      })

      .catch((error) => {
        console.error(
          "Error loading students:",
          error
        );
      });

  }, []);


// Get attendance
const loadAttendance = () => {

  fetch("http://localhost:5000/api/attendance")

    .then((response) => response.json())

    .then((data) => {
      setAttendance(data);
    })

    .catch((error) => {
      console.error(
        "Error loading attendance:",
        error
      );
    });
};


// Get attendance summary
const loadSummary = () => {

  fetch("http://localhost:5000/api/attendance/summary")

    .then((response) => response.json())

    .then((data) => {
      setSummary(data);
    })

    .catch((error) => {
      console.error(
        "Error loading attendance summary:",
        error
      );
    });
};


useEffect(() => {
  loadAttendance();
  loadSummary();
}, []);
  // Add attendance
  const markAttendance = () => {

    if (!selectedStudent || !date) {

      alert(
        "Please select student and date"
      );

      return;
    }

    fetch(
      "http://localhost:5000/api/attendance",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          student_id: Number(selectedStudent),
          date: date,
          status: status
        })
      }
    )

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to mark attendance"
          );
        }

        return response.json();
      })

      .then(() => {

        alert(
          "Attendance marked successfully"
        );

        loadAttendance();

        setSelectedStudent("");
        setDate("");
        setStatus("Present");

      })

      .catch((error) => {

        console.error(error);

        alert(
          "Failed to mark attendance"
        );

      });
  };
  const updateAttendance = (id, currentStatus) => {

  const newStatus =
    currentStatus === "Present"
      ? "Absent"
      : "Present";

  fetch(
    `http://localhost:5000/api/attendance/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        status: newStatus
      })
    }
  )

    .then((response) => {

      if (!response.ok) {
        throw new Error(
          "Failed to update attendance"
        );
      }

      return response.json();
    })

    .then(() => {

      alert(
        `Attendance changed to ${newStatus}`
      );

      loadAttendance();
      loadSummary();

    })

    .catch((error) => {

      console.error(error);

      alert(
        "Failed to update attendance"
      );

    });
};
const deleteAttendance = (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this attendance record?"
  );

  if (!confirmDelete) {
    return;
  }

  fetch(
    `http://localhost:5000/api/attendance/${id}`,
    {
      method: "DELETE"
    }
  )

    .then((response) => {

      if (!response.ok) {
        throw new Error(
          "Failed to delete attendance"
        );
      }

      return response.json();
    })

    .then(() => {

      alert(
        "Attendance deleted successfully"
      );

      loadAttendance();
      loadSummary();

    })

    .catch((error) => {

      console.error(error);

      alert(
        "Failed to delete attendance"
      );

    });
};
const loadStudentAttendance = (studentId) => {

  if (!studentId) {
    setStudentAttendance([]);
    return;
  }

  fetch(
    `http://localhost:5000/api/attendance/student/${studentId}`
  )

    .then((response) => {

      if (!response.ok) {
        throw new Error(
          "Failed to load student attendance"
        );
      }

      return response.json();
    })

    .then((data) => {
      setStudentAttendance(data);
    })

    .catch((error) => {

      console.error(
        "Error loading student attendance:",
        error
      );

    });
};
const selectedStudentStats = {
  total: studentAttendance.length,

  present: studentAttendance.filter(
    (record) => record.status === "Present"
  ).length,

  absent: studentAttendance.filter(
    (record) => record.status === "Absent"
  ).length
};

selectedStudentStats.percentage =
  selectedStudentStats.total === 0
    ? 0
    : (
        (selectedStudentStats.present /
          selectedStudentStats.total) *
        100
      ).toFixed(1);


  return (

    <div className="attendance-page">

      <h1>
        Attendance Management
      </h1>


      {/* MARK ATTENDANCE */}

      <div className="attendance-form">

        <h2>
          Mark Attendance
        </h2>


        <select
          value={selectedStudent}
          onChange={(e) =>
            setSelectedStudent(
              e.target.value
            )
          }
        >

          <option value="">
            Select Student
          </option>

          {students.map((student) => (

            <option
              key={student.id}
              value={student.id}
            >
              {student.student_id} -{" "}
              {student.name}
            </option>

          ))}

        </select>


        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />


        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option value="Present">
            Present
          </option>

          <option value="Absent">
            Absent
          </option>

        </select>


        <button
          onClick={markAttendance}
        >
          Mark Attendance
        </button>

      </div>


      {/* ATTENDANCE TABLE */}

      <div className="attendance-table">

        <h2>
          Attendance Records
        </h2>

        <table>

          <thead>

            <tr>
  <th>Student ID</th>
  <th>Name</th>
  <th>Date</th>
  <th>Status</th>
  <th>Action</th>
</tr>

          </thead>


<tbody>

  {attendance.map(
    (record) => (

      <tr key={record.id}>

        <td>
          {record.student_code}
        </td>

        <td>
          {record.name}
        </td>

        <td>
          {record.date
            ? new Date(record.date).toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata"
              })
            : ""}
        </td>

        <td>
          {record.status}
        </td>

        <td>

          <button
            className="attendance-edit-button"
            onClick={() =>
              updateAttendance(
                record.id,
                record.status
              )
            }
          >
            🔄 Change
          </button>

          <button
            className="attendance-delete-button"
            onClick={() =>
              deleteAttendance(record.id)
            }
          >
            🗑️ Delete
          </button>

        </td>

      </tr>

    )
  )}



          </tbody>

        </table>

      </div>
      <div className="attendance-summary">

  <h2>
    Attendance Summary
  </h2>

  <table>

    <thead>
      <tr>
        <th>Student ID</th>
        <th>Name</th>
        <th>Total Days</th>
        <th>Present</th>
        <th>Absent</th>
        <th>Percentage</th>
      </tr>
    </thead>

    <tbody>

      {summary.map((student) => (

        <tr key={student.id}>

          <td>
            {student.student_id}
          </td>

          <td>
            {student.name}
          </td>

          <td>
            {student.total_days}
          </td>

          <td>
            {student.present_days}
          </td>

          <td>
            {student.absent_days}
          </td>

<td>
  {student.percentage}%

  {student.percentage >= 75 ? (
    <span className="attendance-good">
      🟢 Good
    </span>
  ) : (
    <span className="attendance-low">
      🔴 Low
    </span>
  )}
</td>

        </tr>

      ))}

    </tbody>
{selectedStudentView && (

  <div className="student-attendance-stats">

    <div className="attendance-stat-card">
      <h3>
        {selectedStudentStats.total}
      </h3>
      <p>Total Days</p>
    </div>

    <div className="attendance-stat-card">
      <h3>
        {selectedStudentStats.present}
      </h3>
      <p>Present</p>
    </div>

    <div className="attendance-stat-card">
      <h3>
        {selectedStudentStats.absent}
      </h3>
      <p>Absent</p>
    </div>

    <div className="attendance-stat-card">
      <h3>
        {selectedStudentStats.percentage}%
      </h3>
      <p>Attendance</p>
    </div>

  </div>

)}
  </table>

</div>
<div className="student-attendance">

  <h2>
    Student Attendance History
  </h2>

  <select
    value={selectedStudentView}
    onChange={(e) => {

      const studentId = e.target.value;

      setSelectedStudentView(studentId);

      loadStudentAttendance(studentId);

    }}
  >

    <option value="">
      Select Student
    </option>

    {students.map((student) => (

      <option
        key={student.id}
        value={student.id}
      >
        {student.student_id} - {student.name}
      </option>

    ))}

  </select>


  {selectedStudentView && (

    <table>

      <thead>

        <tr>

          <th>
            Student ID
          </th>

          <th>
            Name
          </th>

          <th>
            Date
          </th>

          <th>
            Status
          </th>

        </tr>

      </thead>


      <tbody>

        {studentAttendance.length === 0 ? (

          <tr>

            <td colSpan="4">
              No attendance records found
            </td>

          </tr>

        ) : (

          studentAttendance.map(
            (record) => (

              <tr key={record.id}>

                <td>
                  {record.student_code}
                </td>

                <td>
                  {record.name}
                </td>

                <td>
                  {new Date(
                    record.date
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      timeZone: "Asia/Kolkata"
                    }
                  )}
                </td>

                <td>
                  {record.status}
                </td>

              </tr>

            )
          )

        )}

      </tbody>

    </table>

  )}

</div>
    </div>
  );
}

export default Attendance;