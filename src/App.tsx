import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store/store";
import { setInitialTokenChecked } from "./store/reducers/userReducer";
import { checkUser, getUserInfo } from "./store/actions/userActions";
import AppPage from "./Pages/AppPage/AppPage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import DashboardPageContainer from "./Pages/DashboardPage/DashboardPageContainer";
import ExpensePageContainer from "./Pages/ExpensesPage/ExpensesPageContainer";
import UserPageContainer from "./Pages/UserPage/UserPageContainer";
import { Spin } from "antd";
import "./App.css";
import { ProtectedRouteProps } from "./types";
import { RootState } from "./store/store";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    token,
    redirectPath = "/login",
}) => {
    return token ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

function App() {
    const dispatch = useDispatch<AppDispatch>();

    const { token, userId, loading, initialTokenChecked } = useSelector(
        (state: RootState) => state.userReducer
    );

    useEffect(() => {
        const localData = localStorage.getItem("userData");
        if (localData) {
            const parsedData = JSON.parse(localData);
            dispatch(checkUser(parsedData.token));
        }
        dispatch(setInitialTokenChecked(true));
    }, []);

    useEffect(() => {
        if (userId) {
            dispatch(getUserInfo(userId));
        }
    }, [userId]);

    if (loading || !initialTokenChecked || !userId) {
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
                    <Route path="*" element={<AuthPage token={token} />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
