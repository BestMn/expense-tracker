import { useState } from "react";
import { useSelector } from "react-redux";
import UserPage from "./UserPage";

const UserPageContainer = () => {
    const userData = useSelector((state: any) => state.userReducer);
    return <UserPage userData={userData} />;
};

export default UserPageContainer;
