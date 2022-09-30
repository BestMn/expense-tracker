import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { userLogin } from "../../store/actions/userActions";
import { RootState, AppDispatch } from "../../store/store";
import LoginForm from "./LoginForm";

const LoginFormContainer = () => {
    const { loading } = useSelector((state: RootState) => state.userReducer);

    const [error, setError] = useState(null);

    const dispatch = useDispatch<AppDispatch>();

    const onFinish = (values: any) => {
        setError(null);
        dispatch(userLogin({ email: values.email, password: values.password }))
            .unwrap()
            .catch((rejectedValue) => {
                setError(rejectedValue.message);
            });
    };

    return <LoginForm onFinish={onFinish} error={error} loading={loading} />;
};

export default LoginFormContainer;
