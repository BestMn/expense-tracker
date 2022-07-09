import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Expense = {
    id: string;
    date: string | Date;
    value: number;
    categoryId: number;
};

interface IExpensesState {
    loading: boolean;
    error: any;
    expenses: Array<Expense>;
}

const initialState: IExpensesState = {
    loading: false,
    error: null,
    expenses: [],
};

export const getUserExpenses = createAsyncThunk(
    "users/getUserExpenses",
    async (userId: number) => {
        const res = await fetch(`http://localhost:3000/users/${userId}`);
        const json = await res.json();
        return json.expenses;
    }
);

const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {
        fetchUserExpenses: (state, action) => {
            state.expenses = action.payload;
        },
        addNewExpense: {
            reducer: (state, action) => {
                const newExpense = {
                    id: "epx-1",
                    date: "2022-06-19T23:15:30.000Z",
                    value: 300,
                    categoryId: 1,
                };
                state.expenses.push(newExpense);
            },
            prepare: (id, value) => {
                const newExpense = {
                    id: "epx-1",
                    date: "2022-06-19T23:15:30.000Z",
                    value: 300,
                    categoryId: 1,
                };
                return { payload: { newExpense } };
            },
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
            });
    },
});

export const { addNewExpense, fetchUserExpenses } = expensesSlice.actions;
export const { reducer } = expensesSlice;
