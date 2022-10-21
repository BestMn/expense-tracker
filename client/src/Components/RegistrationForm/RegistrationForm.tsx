import { Alert, Button, Form, Input } from "antd";
import React from "react";

type RegistrationFormProps = {
    onFinish: (values: any) => void;
    error: string | null;
    loading: boolean;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    onFinish,
    error,
    loading,
}) => {
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Form
                name="registration-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nickname"
                    name="nickName"
                    rules={[
                        { required: true, message: "Please input your Name!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="First Name" name="firstName">
                    <Input />
                </Form.Item>
                <Form.Item label="Second Name" name="secondName">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    validateTrigger={"onSubmit"}
                    rules={[
                        {
                            type: "email",
                            message: "Please enter valid E-mail!",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
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

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button
                        type="primary"
                        size="large"
                        shape="round"
                        htmlType="submit"
                        loading={loading}
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
            {error ? (
                <Alert message={error} type="error" showIcon closable />
            ) : null}
        </>
    );
};

export default RegistrationForm;
