import { createSlice, current } from "@reduxjs/toolkit";
import { deleteUserCategory } from "../actions/categoryActions";
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
    shouldUpdate: boolean;
};

const initialState: TExpensesState = {
    loading: false,
    error: null,
    expenses: null,
    shouldUpdate: true,
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
                state.shouldUpdate = false;
                if (
                    JSON.stringify(current(state).expenses) ==
                    JSON.stringify(action.payload)
                ) {
                    return;
                }
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
                state.loading = false;
                state.expenses?.push(action.payload.expense);
            })
            .addCase(addUserExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(editUserExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUserExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.shouldUpdate = true;
            })
            .addCase(editUserExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteUserExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.shouldUpdate = true;
            })
            .addCase(deleteUserExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(deleteUserCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.shouldUpdate = true;
            })
            .addCase(deleteUserCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const { fetchUserExpenses } = expensesSlice.actions;
export const { reducer } = expensesSlice;
