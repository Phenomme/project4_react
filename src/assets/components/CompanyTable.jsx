// src/components/CompanyTable.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyTable = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Replace with your actual API endpoint
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

    return (
        <div>
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
                            <td>{company.skill}</td> {/* Access related skill name */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyTable;
