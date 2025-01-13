import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ name: "", age: "", skill: "" });
    const [error, setError] = useState("");

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
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/students/", formData);
            setStudents([...students, response.data]);
            setFormData({ name: "", age: "", skill: "" });
        } catch (error) {
            console.error("Error adding student:", error);
            setError("Failed to add student. Please check your input.");
        }
    };

    return (
        
        <div>
            <h1>Students</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Skill</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.skill.skill}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
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
                <button type="submit">Add Student</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};


export default StudentTable;
