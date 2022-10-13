import { useEffect } from "react";
import ExpensesPage from "./ExpensesPage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getUserCategories } from "../../store/actions/categoryActions";
import { getUserExpenses } from "../../store/actions/expenseActions";
import { message } from "antd";
const ExpensePageContainer = () => {
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
    }, []);

    return <ExpensesPage />;
};

export default ExpensePageContainer;
