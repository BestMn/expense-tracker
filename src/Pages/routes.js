import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
} from "react-router-dom";
import AuthPage from "./AuthPage";
import DashboardPage from "./DashboardPage";
import ExpensesPage from "./ExpensesPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Router>
                <Routes>
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="*" element={<AuthPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/expenses" element={<ExpensesPage />} />
                    <Route path="*" element={<DashboardPage />} />
                </Routes>
            </Router>
        );
    } else {
        return (
            <Router>
                <Routes>
                    <Navigate to="/login" replace />;
                </Routes>
            </Router>
        );
    }
};
