import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../store/reducers/userReducer";
import { AppDispatch } from "../../store/store";
import UserPage from "./UserPage";

const UserPageContainer = () => {
    const userData = useSelector((state: any) => state.userReducer);
    const dispatch = useDispatch<AppDispatch>();
    const onFinish = (value) => {
        const editedUser = { ...value, id: userData.userId };
        console.log(editedUser);
        dispatch(editUser(editedUser));
    };
    return <UserPage userData={userData} onFinish={onFinish} />;
};

export default UserPageContainer;
