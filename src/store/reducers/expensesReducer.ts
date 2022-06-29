import { createSlice } from "@reduxjs/toolkit";

type Expense = {
    id: string;
    date: Date;
    value: number;
    categoryId: number;
};

interface IExpensesState {
    categories: Array<Expense>;
}

const initialState: IExpensesState = {
    categories: [
        { id: "epx-1", date: new Date(2022, 6, 29), value: 300, categoryId: 1 },
    ],
};

const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {
        addNewExpense(state) {
            state.categories.push({
                id: "epx-2",
                date: new Date(2022, 6, 29),
                value: 100,
                categoryId: 2,
            });
        },
    },
});

export const { addNewExpense } = expensesSlice.actions;
export const { reducer } = expensesSlice;
