import { useEffect } from "react";
import DashboardPage from "./DashboardPage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { getUserCategories } from "../../store/actions/categoryActions";
import { getUserExpenses } from "../../store/actions/expenseActions";
import { message } from "antd";

const DashboardPageContainer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { userId } = useSelector((state: RootState) => state.userReducer);

    useEffect(() => {
        dispatch(getUserCategories(userId))
            .unwrap()
            .catch((rejectedValue) => {
                message.error(rejectedValue.message);
            });
        dispatch(getUserExpenses(userId))
            .unwrap()
            .catch((rejectedValue) => {
                message.error(rejectedValue.message);
            });
    }, [userId]);

    return <DashboardPage />;
};

export default DashboardPageContainer;
