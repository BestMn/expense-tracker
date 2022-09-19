import { createAsyncThunk } from "@reduxjs/toolkit";

type AddUserExpenseData = {
    userId: number;
    categoryId: number;
    amount: number;
    date: string;
    description: string;
};

export type EditUserExpenseData = {
    userId: number;
    id: number;
    categoryId: number;
    amount: number;
    date: string;
    description: string;
};

type DeleteUserExpenseData = {
    userId: number;
    id: number;
};

export const getUserExpenses = createAsyncThunk(
    "expenses/getUserExpenses",
    async (userId: number) => {
        const res = await fetch(
            `http://localhost:5000/api/expense?userId=${userId}`
        );
        return await res.json();
    }
);

export const addUserExpense = createAsyncThunk(
    "expenses/addUserExpense",
    async (data: AddUserExpenseData) => {
        const response = await fetch(`http://localhost:5000/api/expense`, {
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

export const editUserExpense = createAsyncThunk(
    "expenses/editUserExpense",
    async (data: EditUserExpenseData) => {
        const res = await fetch(`http://localhost:5000/api/expense`, {
            method: "PATCH",
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
        return await res.json();
    }
);

export const deleteUserExpense = createAsyncThunk(
    "expenses/deleteUserExpense",
    async (data: DeleteUserExpenseData) => {
        const res = await fetch(`http://localhost:5000/api/expense`, {
            method: "DELETE",
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
        return await res.json();
    }
);