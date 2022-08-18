import { useEffect } from "react";
import DashboardPage from "./DashboardPage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUserExpenses } from "../../store/reducers/expensesReducer";
import { getUserCategories } from "../../store/reducers/categoriesReducer";

const DashboardPageContainer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { token, userId } = useSelector((state) => state.userReducer);
    const {
        expenses,
        loading: expensesLoading,
        error,
        shouldUpdate: shouldUpdateExpenses,
    } = useSelector((state: any) => state.expensesReducer);

    const {
        categories,
        loading: categoriesLoading,
        shouldUpdate: shouldUpdateCategories,
    } = useSelector((state: any) => state.categoriesReducer);

    useEffect(() => {
        if (token && shouldUpdateCategories === true) {
            dispatch(getUserCategories(userId));
        }
    }, [token, shouldUpdateCategories]);

    useEffect(() => {
        if (token && shouldUpdateExpenses === true) {
            dispatch(getUserExpenses({ userId }));
        }
    }, [token, shouldUpdateExpenses]);

    return <DashboardPage />;
};

export default DashboardPageContainer;
