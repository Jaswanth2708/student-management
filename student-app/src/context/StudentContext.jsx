import { createContext, useContext, useEffect, useState } from "react";

const StudentContext = createContext();

export function StudentProvider({ children }) {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get students from backend
  useEffect(() => {

    fetch("http://localhost:5000/api/students")

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        return response.json();
      })

      .then((data) => {

        const formattedStudents = data.map((student) => ({
          id: student.id,

          studentId: student.student_id,

          name: student.name,

          department: student.department || "",

          image: student.image || "",

          marks: {
            maths: Number(student.maths),
            physics: Number(student.physics),
            computer: Number(student.computer)
          }
        }));

        setStudents(formattedStudents);

        setLoading(false);
      })

      .catch((error) => {

        console.error("Error loading students:", error);

        setLoading(false);
      });

  }, []);


  // Add student
  const addStudent = async (student) => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/students",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(student)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      // Get updated students
      const updatedResponse = await fetch(
        "http://localhost:5000/api/students"
      );

      const data = await updatedResponse.json();

      const formattedStudents = data.map((student) => ({
        id: student.id,

        studentId: student.student_id,

        name: student.name,

        department: student.department || "",

        image: student.image || "",

        marks: {
          maths: Number(student.maths),
          physics: Number(student.physics),
          computer: Number(student.computer)
        }
      }));

      setStudents(formattedStudents);

    } catch (error) {

      console.error("Error adding student:", error);

    }
  };

const updateStudent = async (id, student) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/students/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update student");
    }

    // Get updated students from backend
    const updatedResponse = await fetch(
      "http://localhost:5000/api/students"
    );

    const data = await updatedResponse.json();

    const formattedStudents = data.map((student) => ({
      id: student.id,
      studentId: student.student_id,
      name: student.name,
      department: student.department || "",
      image: student.image || "",
      marks: {
        maths: Number(student.maths),
        physics: Number(student.physics),
        computer: Number(student.computer)
      }
    }));

    setStudents(formattedStudents);

  } catch (error) {
    console.error("Error updating student:", error);
  }
};
const deleteStudent = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/students/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete student");
    }

    const updatedResponse = await fetch(
      "http://localhost:5000/api/students"
    );

    const data = await updatedResponse.json();

    const formattedStudents = data.map((student) => ({
      id: student.id,
      studentId: student.student_id,
      name: student.name,
      department: student.department || "",
      image: student.image || "",
      marks: {
        maths: Number(student.maths),
        physics: Number(student.physics),
        computer: Number(student.computer)
      }
    }));

    setStudents(formattedStudents);

  } catch (error) {
    console.error("Error deleting student:", error);
  }
};
  return (
    <StudentContext.Provider
      value={{
        students,
        setStudents,
        loading,
        addStudent,
        updateStudent,
        deleteStudent
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}


export function useStudents() {
  return useContext(StudentContext);
}