import React, { useState, useEffect } from "react";
import axios from "axios";

const CompatibleTable = () => {
    const [compatibles, setCompatibles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCompatibles = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/compatibles/");
                setCompatibles(response.data);
            } catch (error) {
                console.error("Error fetching compatible data:", error);
                setError("Failed to fetch compatible data.");
            }
        };

        fetchCompatibles();
    }, []);

    return (
        <div>
            <h1>Compatible Students and Companies</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table border="1">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Skill</th>
                        <th>Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    {compatibles.map((entry, index) => (
                        <tr key={index}>
                           <td>{entry.student_name}</td>
                           <td>{entry.student_skill}</td>
                           <td>{entry.companies.join(', ')}</td>{/* Display companies as a comma-separated list */}
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default CompatibleTable;
