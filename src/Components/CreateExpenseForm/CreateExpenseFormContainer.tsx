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

    const onFinish = (value: AddUserExpenseData) => {
        const data: AddUserExpenseData = {
            userId: userId,
            date: value.date,
            amount: value.amount,
            categoryId: value.categoryId,
            description: value.description,
        };
        dispatch(addUserExpense(data));
    };

    return (
        <>
            <h2>Quick Add</h2>
            <CreateExpenseForm
                categories={categories}
                currency={currency}
                onFinish={onFinish}
            />
        </>
    );
};

export default CreateExpenseFormConitaner;
