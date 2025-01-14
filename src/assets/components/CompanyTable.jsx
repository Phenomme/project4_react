import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyTable = () => {
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({ name: "", skill: "" });
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingCompanyId, setEditingCompanyId] = useState(null);

    // Fetch companies
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/companies/");
                setCompanies(response.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchCompanies();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            // Update company
            try {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/companies/${editingCompanyId}/`,
                    formData
                );
                setCompanies((prev) =>
                    prev.map((company) =>
                        company.id === editingCompanyId ? response.data : company
                    )
                );
                setIsEditing(false);
                setEditingCompanyId(null);
                setFormData({ name: "", skill: "" });
            } catch (error) {
                console.error("Error updating company:", error);
                setError("Failed to update company. Please check your input.");
            }
        } else {
            // Add new company
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/companies/", formData);
                setCompanies([...companies, response.data]);
                setFormData({ name: "", skill: "" });
            } catch (error) {
                console.error("Error adding company:", error);
                setError("Failed to add company. Please check your input.");
            }
        }
    };

    const handleEdit = (company) => {
        setIsEditing(true);
        setEditingCompanyId(company.id);
        setFormData({
            name: company.name,
            skill: company.skill,
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/companies/${id}/`);
            setCompanies((prev) => prev.filter((company) => company.id !== id));
        } catch (error) {
            console.error("Error deleting company:", error);
            setError("Failed to delete company.");
        }
    };

    return (
        <div className="container">
            <h1>Companies</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Skill</th>
                
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.id}>
                            <td>{company.id}</td>
                            <td>{company.name}</td>
                            <td>{company.skill.skill}</td>
                            <td>
                                <button onClick={() => handleEdit(company)}>Update</button>
                                <button onClick={() => handleDelete(company.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>{isEditing ? "Edit Company" : "Add New Company"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                <button type="submit">
                    {isEditing ? "Update Company" : "Add Company"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default CompanyTable;
