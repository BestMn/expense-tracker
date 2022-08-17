import { useEffect } from "react";
import ExpensesPage from "./ExpensesPage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUserExpenses } from "../../store/reducers/expensesReducer";
import { getUserCategories } from "../../store/reducers/categoriesReducer";

const ExpensePageContainer = () => {
    // const dispatch = useDispatch<AppDispatch>();

    // const { token, userId } = useSelector((state) => state.userReducer);
    // const {
    //     expenses,
    //     loading: expensesLoading,
    //     error,
    // } = useSelector((state: any) => state.expensesReducer);

    // const { categories, loading: categoriesLoading } = useSelector(
    //     (state: any) => state.categoriesReducer
    // );

    // useEffect(() => {
    //     if (token) {
    //         dispatch(getUserCategories(userId));
    //         dispatch(getUserExpenses(userId));
    //     }
    // }, [token]);

    return <ExpensesPage />;
};

export default ExpensePageContainer;
