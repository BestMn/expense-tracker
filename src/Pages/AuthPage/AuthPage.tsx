import React from "react";
import { Navigate } from "react-router-dom";
import RegistrationForm from "../../Components/RegistrationForm/RegistrationForm";
import LoginForm from "../../Components/LoginForm/LoginForm";
import "./AuthPage.css";

const AuthPage: React.FC = ({ token }) => {
    if (token) {
        return <Navigate to={"/dashboard"} replace />;
    }
    return (
        <main>
            <div className={"auth-page"}>
                <div className={"auth-page__login-container"}>
                    <RegistrationForm />
                    <LoginForm />
                </div>
            </div>
        </main>
    );
};

export default AuthPage;
