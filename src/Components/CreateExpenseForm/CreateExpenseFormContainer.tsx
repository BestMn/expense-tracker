import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    addUserExpense,
    AddUserExpenseData,
} from "../../store/actions/expenseActions";
import { AppDispatch, RootState } from "../../store/store";
import CreateExpenseForm from "./CreateExpenseForm";

const CreateExpenseFormConitaner = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { userId, currency } = useSelector(
        (state: RootState) => state.userReducer
    );
    const { categories } = useSelector(
        (state: RootState) => state.categoriesReducer
    );
    const { loading } = useSelector(
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

    return (
        <CreateExpenseForm
            categories={categories}
            currency={currency}
            onFinish={onFinish}
            loading={loading}
        />
    );
};

export default CreateExpenseFormConitaner;
