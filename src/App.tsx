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
import AppPage from "./Pages/AppPage/AppPage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import DashboardPageContainer from "./Pages/DashboardPage/DashboardPageContainer";
import ExpensePageContainer from "./Pages/ExpensesPage/ExpensesPageContainer";
import UserPageContainer from "./Pages/UserPage/UserPageContainer";
import { Spin } from "antd";

const ProtectedRoute = ({ token, redirectPath = "/login" }) => {
    return token ? <Outlet /> : <Navigate to={redirectPath} replace />;
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
        console.log(token);
        if (token) {
            dispatch(getUserInfo(userId));
        }
    }, [token]);

    if (loading) {
        return <Spin />;
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthPage token={token} />} />
                <Route element={<ProtectedRoute token={token} />}>
                    <Route
                        path="/dashboard"
                        element={
                            <AppPage children={<DashboardPageContainer />} />
                        }
                    />
                    <Route
                        path="/expenses"
                        element={
                            <AppPage children={<ExpensePageContainer />} />
                        }
                    />
                    <Route
                        path="/user"
                        element={<AppPage children={<UserPageContainer />} />}
                    />
                    <Route path="*" element={<AuthPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
