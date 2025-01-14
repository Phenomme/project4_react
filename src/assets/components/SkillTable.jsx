import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentTable = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ skill: "" });
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Track if we're in edit mode
    const [editingSkillId, setEditingSkillId] = useState(null); // ID of the skill being edited

    // Fetch skills
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/skills/");
                setSkills(response.data);
            } catch (error) {
                console.error("Error fetching skills:", error);
            }
        };
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
                    `http://127.0.0.1:8000/api/skills/${editingSkillId}/`,
                    formData
                );
                setSkills((prev) =>
                    prev.map((skill) =>
                        skill.id === editingSkillId ? response.data : skill
                    )
                );
                setIsEditing(false);
                setEditingSkillId(null);
                setFormData({ skill: "" });
            } catch (error) {
                console.error("Error updating skill:", error);
                setError("Failed to update skill. Please check your input.");
            }
        } else {
            // Handle create logic
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/skills/", formData);
                setSkills([...skills, response.data]);
                setFormData({ skill: "" });
            } catch (error) {
                console.error("Error adding skill:", error);
                setError("Failed to add skill. Please check your input.");
            }
        }
    };

    const handleEdit = (skill) => {
        setIsEditing(true);
        setEditingSkillId(skill.id);
        setFormData({
            skill: skill.skill,
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/skills/${id}/`);
            setSkills((prev) => prev.filter((skill) => skill.id !== id));
        } catch (error) {
            console.error("Error deleting skill:", error);
            setError("Failed to delete skill.");
        }
    };

    return (
        <div>
            <h1>Skills</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Skill</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill) => (
                        <tr key={skill.id}>
                            <td>{skill.id}</td>
                            <td>{skill.skill}</td>
                            <td>
                                <button onClick={() => handleEdit(skill)}>Update</button>
                                <button onClick={() => handleDelete(skill.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>{isEditing ? "Edit Skills" : "Add New Skills"}</h2>
            <form onSubmit={handleSubmit}>
            <div>
                    <label>Skill:</label>
                    <input
                        type="text"
                        name="skill"
                        value={formData.skill}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{isEditing ? "Update Skill" : "Add Skill"}</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default StudentTable;
