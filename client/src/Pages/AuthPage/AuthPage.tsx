import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import RegistrationFormContainer from "../../Components/RegistrationForm/RegistrationFormContainer";
import LoginFormContainer from "../../Components/LoginForm/LoginFormContainer";
import { Button } from "antd";
import { AuthPageProps } from "../../types";
import "./AuthPage.css";

const AuthPage: React.FC<AuthPageProps> = ({ token }) => {
    const authContainer = useRef(null);
    
    if (token) {
        return <Navigate to={"/dashboard"} replace />;
    }

    return (
        <main>
            <div className="auth-page">
                <div ref={authContainer} className="auth-page__auth-container">
                    <div className="auth-page__auth-form sign-in-container">
                        <h1 className="auth-page__auth-form-title">Sign in</h1>
                        <LoginFormContainer />
                    </div>
                    <div className="auth-page__auth-form sign-up-container">
                        <h1 className="auth-page__auth-form-title">
                            Create Account
                        </h1>
                        <RegistrationFormContainer />
                    </div>

                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                Already have an account? Please sign in with
                                your login
                            </p>
                            <Button
                                ghost
                                size="large"
                                shape="round"
                                onClick={() =>
                                    authContainer.current.classList.remove(
                                        "right-panel-active"
                                    )
                                }
                            >
                                Sign In
                            </Button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Enter your personal details and start manage
                                your expenses
                            </p>
                            <Button
                                ghost
                                size="large"
                                shape="round"
                                onClick={() =>
                                    authContainer.current.classList.add(
                                        "right-panel-active"
                                    )
                                }
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AuthPage;
