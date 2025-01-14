import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ name: "", age: "", skill: "" });
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Track if we're in edit mode
    const [editingStudentId, setEditingStudentId] = useState(null); // ID of the student being edited

    // Fetch students and skills
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/students/");
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/skills/");
                setSkills(response.data);
            } catch (error) {
                console.error("Error fetching skills:", error);
            }
        };

        fetchStudents();
        fetchSkills();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            // Handle update logic
            try {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/students/${editingStudentId}/`,
                    formData
                );
                setStudents((prev) =>
                    prev.map((student) =>
                        student.id === editingStudentId ? response.data : student
                    )
                );
                setIsEditing(false);
                setEditingStudentId(null);
                setFormData({ name: "", age: "", skill: "" });
            } catch (error) {
                console.error("Error updating student:", error);
                setError("Failed to update student. Please check your input.");
            }
        } else {
            // Handle create logic
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/students/", formData);
                setStudents([...students, response.data]);
                setFormData({ name: "", age: "", skill: "" });
            } catch (error) {
                console.error("Error adding student:", error);
                setError("Failed to add student. Please check your input.");
            }
        }
    };

    const handleEdit = (student) => {
        setIsEditing(true);
        setEditingStudentId(student.id);
        setFormData({
            name: student.name,
            age: student.age,
            skill: student.skill.id,
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/students/${id}/`);
            setStudents((prev) => prev.filter((student) => student.id !== id));
        } catch (error) {
            console.error("Error deleting student:", error);
            setError("Failed to delete student.");
        }
    };

    return (
        <div className="container">
            <h1>Students</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Skill</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.skill.skill}</td>
                            <td>
                                <button onClick={() => handleEdit(student)}>Update</button>
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>{isEditing ? "Edit Student" : "Add New Student"}</h2>
            <form onSubmit={handleSubmit} className="container">
                <div>
                    <label>Name:</label>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        className="input"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Skill:</label>
                    <select
                        className="input"
                        name="skill"
                        value={formData.skill}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a skill</option>
                        {skills.map((skill) => (
                            <option key={skill.id} value={skill.id}>
                                {skill.skill}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{isEditing ? "Update Student" : "Add Student"}</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default StudentTable;
