import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate,
    useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store/store";
import { getUserExpenses } from "./store/reducers/expensesReducer";
import { getUserCategories } from "./store/reducers/categoriesReducer";
import {
    checkUser,
    getUserInfo,
    setToken,
    setUserId,
} from "./store/reducers/userReducer";
import AuthPage from "./Pages/AuthPage";
import DashboardPage from "./Pages/DashboardPage";
import ExpensesPage from "./Pages/ExpensesPage";
import { useRoutes } from "./Pages/routes";
import { Spin } from "antd";

const ProtectedRoute = ({ token, redirectPath = "/login" }) => {
    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

function App() {
    const dispatch = useDispatch<AppDispatch>();

    const { token, userId, loading } = useSelector(
        (state) => state.userReducer
    );

    useEffect(() => {
        const localData = localStorage.getItem("userData");
        if (localData) {
            const parsedData = JSON.parse(localData);
            dispatch(checkUser(parsedData.token));
            dispatch(setUserId(parsedData.userId));
        }
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(getUserInfo(userId));
            dispatch(getUserCategories(userId));
            dispatch(getUserExpenses(userId));
        }
    }, [token]);

    if (loading) {
        return <Spin />;
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route element={<ProtectedRoute token={token} />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/expenses" element={<ExpensesPage />} />
                    <Route path="*" element={<AuthPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
