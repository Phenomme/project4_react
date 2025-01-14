import React from "react";
import CompanyTable from "./assets/components/CompanyTable";
import SkillTable from "./assets/components/SkillTable";
import StudentTable from "./assets/components/StudentTable";
import CompatibleTable from "./assets/components/CompatibleTable";
function App() {
    return (
        <>
        <div className="App">
            <CompanyTable />
        </div>

        <div className="App">
            <SkillTable />
        </div>

        <div className="App">
            <StudentTable />
        </div>

        <div className="App">
            <CompatibleTable />
        </div>
        </>
    );
}

export default App;
