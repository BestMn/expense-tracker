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
    const { shouldUpdate: shouldUpdateExpenses } = useSelector(
        (state: RootState) => state.expensesReducer
    );

    const { shouldUpdate: shouldUpdateCategories } = useSelector(
        (state: RootState) => state.categoriesReducer
    );

    useEffect(() => {
        if (shouldUpdateCategories) {
            dispatch(getUserCategories(userId))
                .unwrap()
                .catch((rejectedValue) => {
                    message.error(rejectedValue.message);
                });
        }
    }, [userId, shouldUpdateCategories]);

    useEffect(() => {
        if (shouldUpdateExpenses) {
            dispatch(getUserExpenses(userId))
                .unwrap()
                .catch((rejectedValue) => {
                    message.error(rejectedValue.message);
                });
        }
    }, [shouldUpdateExpenses]);

    return <DashboardPage />;
};

export default DashboardPageContainer;
