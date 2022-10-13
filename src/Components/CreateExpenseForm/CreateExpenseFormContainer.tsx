import { message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    addUserExpense,
    AddUserExpenseData,
} from "../../store/actions/expenseActions";
import { AppDispatch, RootState } from "../../store/store";
import CreateExpenseForm from "./CreateExpenseForm";

const CreateExpenseFormConitaner = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        userId,
        currency,
        loading: userLoading,
    } = useSelector((state: RootState) => state.userReducer);
    const { categories, loading: categoriesLoading } = useSelector(
        (state: RootState) => state.categoriesReducer
    );
    const { loading: expensesLoading } = useSelector(
        (state: RootState) => state.expensesReducer
    );

    const onFinish = (value: AddUserExpenseData) => {
        const data: AddUserExpenseData = {
            userId: userId,
            date: value.date,
            amount: value.amount,
            categoryId: value.categoryId,
            description: value.description,
        };
        dispatch(addUserExpense(data))
            .unwrap()
            .catch((rejectedValue) => {
                message.error(rejectedValue.message);
            });
    };

    if (categoriesLoading || userLoading) {
        return (
            <div className="spin-container">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <CreateExpenseForm
            categories={categories}
            currency={currency}
            onFinish={onFinish}
            loading={expensesLoading}
        />
    );
};

export default CreateExpenseFormConitaner;
