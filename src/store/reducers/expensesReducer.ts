import { createSlice } from "@reduxjs/toolkit";

type Expense = {
    id: string;
    date: string | Date;
    value: number;
    categoryId: number;
};

interface IExpensesState {
    expenses: Array<Expense>;
}

const initialState: IExpensesState = {
    expenses: [
        {
            id: "epx-1",
            date: "2022-06-19T23:15:30.000Z",
            value: 300,
            categoryId: 1,
        },
        {
            id: "epx-2",
            date: "2022-06-25T23:15:30.000Z",
            value: 150,
            categoryId: 2,
        },
        {
            id: "epx-3",
            date: "2022-07-03T23:15:30.000Z",
            value: 100,
            categoryId: 3,
        },
        {
            id: "epx-4",
            date: "2022-07-06T23:15:30.000Z",
            value: 80,
            categoryId: 4,
        },
    ],
};

const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {
        addNewExpense(state) {
            state.expenses.push({
                id: "epx-5",
                date: new Date(2022, 6, 29),
                value: 100,
                categoryId: 2,
            });
        },
    },
});

export const { addNewExpense } = expensesSlice.actions;
export const { reducer } = expensesSlice;
