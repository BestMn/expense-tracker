import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { userLogin } from "../../store/actions/userActions";

const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        dispatch(userLogin({ email: values.email, password: values.password }));
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
                <Button
                    type="primary"
                    size="large"
                    shape="round"
                    htmlType="submit"
                >
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
