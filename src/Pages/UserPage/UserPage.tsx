import { Button } from "antd";
import { EditFilled } from "@ant-design/icons";
import "./UserPage.css";

const UserPage = () => {
    return (
        <div className="user-page__wrapper">
            <div className="app-block profile-block">
                <div className="profile-block__header">
                    <span className="profile-block__header-title">
                        UserPage
                    </span>
                    <Button
                        type="primary"
                        icon={<EditFilled />}
                        size="large"
                        className="profile-block__header-edit-btn"
                    >
                        Edit
                    </Button>
                </div>
                <div className="profile-block__info">
                    <div className="profile-block__info-item">
                        <div className="profile-block__info-item-title">
                            First Name
                        </div>
                        <div className="profile-block__info-item-text">
                            Serrcun
                        </div>
                    </div>
                    <div className="profile-block__info-item">
                        <div className="profile-block__info-item-title">
                            Second Name
                        </div>
                        <div className="profile-block__info-item-text">
                            Balat
                        </div>
                    </div>
                    <div className="profile-block__info-item">
                        <div className="profile-block__info-item-title">
                            Nickname
                        </div>
                        <div className="profile-block__info-item-text">
                            Test
                        </div>
                    </div>
                    <div className="profile-block__info-item">
                        <div className="profile-block__info-item-title">
                            E-mail
                        </div>
                        <div className="profile-block__info-item-text">
                            test@mail.ru
                        </div>
                    </div>
                    <div className="profile-block__info-item">
                        <div className="profile-block__info-item-title">
                            Phone
                        </div>
                        <div className="profile-block__info-item-text">
                            +7-952-852-99-82
                        </div>
                    </div>
                    <div className="profile-block__info-item">
                        <div className="profile-block__info-item-title">
                            Country
                        </div>
                        <div className="profile-block__info-item-text">
                            Russia
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
