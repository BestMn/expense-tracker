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
    expenses: Array<Expense> | null;
}

const initialState: IExpensesState = {
    loading: false,
    error: null,
    expenses: null,
};

export const getUserExpenses = createAsyncThunk(
    "expenses/getUserExpenses",
    async (userId: number) => {
        const res = await fetch(
            `http://localhost:3000/expenses?userId=${userId}`
        );
        return await res.json();
    }
);

export const addUserExpenses = createAsyncThunk(
    "expenses/addUserExpenses",
    async (data = {}) => {
        const response = await fetch(`http://localhost:3000/expenses`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        return await response.json();
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
            })
            .addCase(addUserExpenses.pending, (state) => {
                console.log(state);
                state.loading = true;
            })
            .addCase(addUserExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses.push(action.payload);
            })
            .addCase(addUserExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const { addNewExpense, fetchUserExpenses } = expensesSlice.actions;
export const { reducer } = expensesSlice;
