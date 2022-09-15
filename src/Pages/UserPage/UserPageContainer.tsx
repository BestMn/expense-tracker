import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import UserPage from "./UserPage";
import { RootState } from "../../store/store";
import { editUser } from "../../store/actions/userActions";
import { EditUserData } from "../../store/actions/userActions";

const UserPageContainer = () => {
    const userData = useSelector((state: RootState) => state.userReducer);
    const dispatch = useDispatch<AppDispatch>();
    const onFinish = (value: EditUserData) => {
        const editedUser = { ...value, id: userData.userId };
        dispatch(editUser(editedUser));
    };
    return <UserPage userData={userData} onFinish={onFinish} />;
};

export default UserPageContainer;
