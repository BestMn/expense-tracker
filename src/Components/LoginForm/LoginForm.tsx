import { Alert, Button, Checkbox, Form, Input } from "antd";
import React from "react";

type LoginFormProps = {
    onFinish: (values: any) => void;
    error: string | null;
    loading: boolean;
};

const LoginForm: React.FC<LoginFormProps> = ({ onFinish, error, loading }) => {
    const onFinishFailed = (errorInfo: any) => {
        console.log("Login Failed:", errorInfo);
    };

    return (
        <>
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
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 4, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button
                        type="primary"
                        size="large"
                        shape="round"
                        htmlType="submit"
                        loading={loading}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
            {error ? (
                <Alert message={error} type="error" showIcon closable />
            ) : null}
        </>
    );
};

export default LoginForm;
