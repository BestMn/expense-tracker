import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RegistrationForm from "../Components/RegistrationForm/RegistrationForm";
import LoginForm from "../Components/LoginForm/LoginForm";

const AuthPage: React.FC = () => {
    const { token } = useSelector((state: any) => state.userReducer);
    return <RegistrationForm />;
};

export default AuthPage;
