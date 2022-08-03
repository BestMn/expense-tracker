import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/reducers/userReducer";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
} from "react-router-dom";

const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        dispatch(userLogin({ email: values.email, password: values.password }));
        console.log("Login success:", values);
        navigate("/dashboard");
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Login Failed:", errorInfo);
    };

    return (
        <Form
            name="login-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Please input your Email!" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
