import { createSlice, current } from "@reduxjs/toolkit";
import {
    getUserExpenses,
    addUserExpense,
    editUserExpense,
    deleteUserExpense,
} from "../actions/expenseActions";

export type TExpense = {
    id: number;
    date: string;
    amount: number;
    categoryId: number;
    description: string;
};

export type TExpensesState = {
    loading: boolean;
    error: any;
    expenses: Array<TExpense> | null;
};

const initialState: TExpensesState = {
    loading: false,
    error: null,
    expenses: null,
};

const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {
        fetchUserExpenses: (state, action) => {
            state.expenses = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = action.payload;
            })
            .addCase(getUserExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addUserExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUserExpense.fulfilled, (state, action) => {
                state.expenses?.push(action.payload.expense);
                state.loading = false;
            })
            .addCase(addUserExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(editUserExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUserExpense.fulfilled, (state, action) => {
                const updatedExpenseInx = state.expenses.findIndex(
                    (el) => el.id == action.payload.updatedExpense[1][0].id
                );
                state.expenses[updatedExpenseInx] =
                    action.payload.updatedExpense[1][0];
                state.loading = false;
            })
            .addCase(editUserExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteUserExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserExpense.fulfilled, (state, action) => {
                const deletedExpenseInx = state.expenses.findIndex(
                    (el) => el.id == action.meta.arg.id
                );
                if (deletedExpenseInx >= 0) {
                    state.expenses.splice(deletedExpenseInx, 1);
                }
                state.loading = false;
            })
            .addCase(deleteUserExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const { fetchUserExpenses } = expensesSlice.actions;
export const { reducer } = expensesSlice;
