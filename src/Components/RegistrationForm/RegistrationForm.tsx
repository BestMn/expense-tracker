import { Button, Form, Input } from "antd";
import React from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { userRegistration } from "../../store/actions/userActions";

const RegistrationForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const onFinish = (values: any) => {
        dispatch(
            userRegistration({
                nickName: values.nickName,
                firstName: values.firstName,
                secondName: values.secondName,
                email: values.email,
                password: values.password,
            })
        );
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
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
                rules={[{ required: true, message: "Please input your Name!" }]}
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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;
