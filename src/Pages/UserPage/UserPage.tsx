import { useState } from "react";
import { Button, Input, Form, Avatar } from "antd";
import { EditFilled, UserOutlined } from "@ant-design/icons";
import "./UserPage.css";

const UserPage = ({ userData }) => {
    const [form] = Form.useForm();
    const [editMode, setEditMode] = useState(false);
    return (
        <div className="user-page__wrapper">
            <div className="app-block profile-block">
                <div className="profile-block__header">
                    <div className="profile-block__header-info">
                        <div className="profile-block__header-avatar">
                            <Avatar size={64} icon={<UserOutlined />} />
                        </div>
                        <div className="profile-block__header-title">
                            <span className="profile-block__header-name">
                                {userData.nickName}
                            </span>
                            <span className="profile-block__header-email">
                                {userData.email}
                            </span>
                        </div>
                    </div>

                    <Button
                        type="primary"
                        size="large"
                        icon={<EditFilled />}
                        className="profile-block__header-edit-btn"
                        onClick={() => setEditMode(!editMode)}
                    >
                        Edit
                    </Button>
                </div>
                <Form form={form}>
                    <div className="profile-block__info">
                        <div className="profile-block__info-item">
                            <div className="profile-block__info-item-title">
                                First Name
                            </div>
                            <div className="profile-block__info-item-text">
                                {editMode ? (
                                    <Form.Item
                                        name={["user", "firstName"]}
                                        initialValue={userData.firstName}
                                    >
                                        <Input
                                            placeholder="First Name"
                                            size="large"
                                        />
                                    </Form.Item>
                                ) : (
                                    <span>{userData.firstName}</span>
                                )}
                            </div>
                        </div>

                        <div className="profile-block__info-item">
                            <div className="profile-block__info-item-title">
                                Second Name
                            </div>
                            <div className="profile-block__info-item-text">
                                {editMode ? (
                                    <Form.Item
                                        name={["user", "secondName"]}
                                        initialValue={userData.secondName}
                                    >
                                        <Input
                                            placeholder="Second Name"
                                            size="large"
                                        />
                                    </Form.Item>
                                ) : (
                                    <span>{userData.secondName}</span>
                                )}
                            </div>
                        </div>

                        <div className="profile-block__info-item">
                            <div className="profile-block__info-item-title">
                                Nickname
                            </div>
                            <div className="profile-block__info-item-text">
                                {editMode ? (
                                    <Form.Item
                                        name={["user", "nickname"]}
                                        initialValue={userData.nickName}
                                    >
                                        <Input
                                            placeholder="Nickname"
                                            size="large"
                                        />
                                    </Form.Item>
                                ) : (
                                    <span>{userData.nickName}</span>
                                )}
                            </div>
                        </div>

                        <div className="profile-block__info-item">
                            <div className="profile-block__info-item-title">
                                Phone
                            </div>
                            <div className="profile-block__info-item-text">
                                {editMode ? (
                                    <Form.Item
                                        name={["user", "phoneNumber"]}
                                        initialValue={userData.phoneNumber}
                                    >
                                        <Input
                                            placeholder="Phone Number"
                                            size="large"
                                        />
                                    </Form.Item>
                                ) : (
                                    <span>{userData.phoneNumber}</span>
                                )}
                            </div>
                        </div>

                        <div className="profile-block__info-item">
                            <div className="profile-block__info-item-title">
                                Currency
                            </div>
                            <div className="profile-block__info-item-text">
                                {editMode ? (
                                    <Form.Item
                                        name={["user", "currency"]}
                                        initialValue={userData.currency}
                                    >
                                        <Input
                                            placeholder="Currency"
                                            size="large"
                                        />
                                    </Form.Item>
                                ) : (
                                    <span>{userData.currency}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UserPage;
