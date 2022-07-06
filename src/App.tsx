import { React, createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import getUserData from "./services/getUserData";
import DashboardPage from "./Pages/DashboardPage";
import ExpensesPage from "./Pages/ExpensesPage";

const AppCtx = createContext(null);

function App() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserData(1)
            .then((data) => setUserData(data))
            .then(() => console.log(userData));
    });

    return (
        <Router>
            <AppCtx.Provider value={userData}>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/expenses" element={<ExpensesPage />} />
                </Routes>
            </AppCtx.Provider>
        </Router>
    );
}

export default App;
