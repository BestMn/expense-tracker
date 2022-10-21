import baseURL from "../../services/baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type AddUserExpenseData = {
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

type ErrorWithMessage = {
    message: string;
};

export const getUserExpenses = createAsyncThunk<
    any,
    number,
    { state: RootState }
>("expenses/getUserExpenses", async (userId, { getState }) => {
    const { token } = getState().userReducer;
    const res = await fetch(`${baseURL}/expense?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
});

export const addUserExpense = createAsyncThunk<
    any,
    AddUserExpenseData,
    { state: RootState; rejectValue: ErrorWithMessage }
>("expenses/addUserExpense", async (data, { getState, rejectWithValue }) => {
    const { token } = getState().userReducer;
    const response = await fetch(`${baseURL}/expense`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    const res = await response.json();
    if (!response.ok) {
        return rejectWithValue(res);
    }
    return res;
});

export const editUserExpense = createAsyncThunk<
    any,
    EditUserExpenseData,
    { state: RootState; rejectValue: ErrorWithMessage }
>("expenses/editUserExpense", async (data, { getState, rejectWithValue }) => {
    const { token } = getState().userReducer;
    const response = await fetch(`${baseURL}/expense`, {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    const res = await response.json();
    if (!response.ok) {
        return rejectWithValue(res);
    }
    return res;
});

export const deleteUserExpense = createAsyncThunk<
    any,
    DeleteUserExpenseData,
    { state: RootState; rejectValue: ErrorWithMessage }
>("expenses/deleteUserExpense", async (data, { getState, rejectWithValue }) => {
    const { token } = getState().userReducer;
    const response = await fetch(`${baseURL}/expense`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    const res = await response.json();
    if (!response.ok) {
        return rejectWithValue(res);
    }
    return res;
});
