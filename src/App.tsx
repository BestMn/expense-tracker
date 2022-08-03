import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store/store";
import { getUserExpenses } from "./store/reducers/expensesReducer";
import { getUserCategories } from "./store/reducers/categoriesReducer";
import { getUserInfo, setToken, setUserId } from "./store/reducers/userReducer";
import AuthPage from "./Pages/AuthPage";
import DashboardPage from "./Pages/DashboardPage";
import ExpensesPage from "./Pages/ExpensesPage";
import { useRoutes } from "./Pages/routes";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    const { token, userId } = useSelector((state) => state.userReducer);
    const routes = useRoutes(token);

    const ProtectedRoute = ({ children }) => {
        if (!token) {
            return <Navigate to="/login" replace />;
        }

        return children;
    };

    useEffect(() => {
        const data = localStorage.getItem("userData");
        if (data) {
            const parsedData = JSON.parse(data);
            dispatch(setToken(parsedData.token));
            dispatch(setUserId(parsedData.userId));
        }
    }, []);

    useEffect(() => {
        console.log("UserId:", userId);
        if (userId) {
            dispatch(getUserCategories(userId));
            dispatch(getUserExpenses(userId));
        }
    }, [userId]);

    return routes;
}

export default App;
