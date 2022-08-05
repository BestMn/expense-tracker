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
import { checkUser, setToken, setUserId } from "./store/reducers/userReducer";
import AuthPage from "./Pages/AuthPage";
import DashboardPage from "./Pages/DashboardPage";
import ExpensesPage from "./Pages/ExpensesPage";
import { useRoutes } from "./Pages/routes";

const ProtectedRoute = ({ token, redirectPath = "/login", children }) => {
    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

function App() {
    const dispatch = useDispatch<AppDispatch>();

    const { token, userId } = useSelector((state) => state.userReducer);
    console.log(token);
    const localData = localStorage.getItem("userData");

    useEffect(() => {
        if (localData) {
            const parsedData = JSON.parse(localData);
            dispatch(checkUser(parsedData.token));
        }
    }, []);

    useEffect(() => {
        if (localData) {
            const parsedData = JSON.parse(localData);
            dispatch(setToken(parsedData.token));
            dispatch(setUserId(parsedData.userId));
        }
    }, []);
    useEffect(() => {
        if (userId) {
            dispatch(getUserCategories(userId));
            dispatch(getUserExpenses(userId));
        }
    }, [userId]);

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
