import React from "react";
import { useSelector } from "react-redux";
import CreateExpenseForm from "./CreateExpenseForm";

const CreateExpenseFormConitaner = () => {
    const { categories } = useSelector((state: any) => state.categoriesReducer);

    if (categories) {
        return (
            <React.Fragment>
                <h2>Quick Add</h2>
                <CreateExpenseForm categories={categories} />
            </React.Fragment>
        );
    }
};

export default CreateExpenseFormConitaner;
