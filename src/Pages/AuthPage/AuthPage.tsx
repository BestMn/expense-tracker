import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate,
    useNavigate,
} from "react-router-dom";
import RegistrationForm from "../../Components/RegistrationForm/RegistrationForm";
import LoginForm from "../../Components/LoginForm/LoginForm";

const AuthPage: React.FC = ({ token }) => {
    if (token) {
        return <Navigate to={"/dashboard"} replace />;
    }
    return (
        <>
            <RegistrationForm />
            <LoginForm />
        </>
    );
};

export default AuthPage;
