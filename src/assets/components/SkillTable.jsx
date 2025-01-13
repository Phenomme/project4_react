import React, { useState, useEffect } from "react";
import axios from "axios";

const SkillTable = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/skills/");
                setSkills(response.data);
            } catch (error) {
                console.error("Error fetching Skills:", error);
            }
        };

        fetchSkills();
    }, []);

    return (
        <div>
            <h1>Skills</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Skill</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skills) => (
                        <tr key={skills.id}>                      
                            <td>{skills.id}</td>                      
                            <td>{skills.skill}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SkillTable;