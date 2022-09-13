import { useEffect } from "react";
import DashboardPage from "./DashboardPage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUserExpenses } from "../../store/reducers/expensesReducer";
import { getUserCategories } from "../../store/reducers/categoriesReducer";
import { RootState } from "../../store/store";

const DashboardPageContainer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { token, userId } = useSelector(
        (state: RootState) => state.userReducer
    );
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
        if (userId && shouldUpdateCategories === true) {
            dispatch(getUserCategories(userId));
        }
    }, [userId, shouldUpdateCategories]);

    useEffect(() => {
        if (userId && shouldUpdateExpenses === true) {
            dispatch(getUserExpenses(userId));
        }
    }, [userId, shouldUpdateExpenses]);

    return <DashboardPage />;
};

export default DashboardPageContainer;
