import { createAsyncThunk } from "@reduxjs/toolkit";
import { IconList } from "../../Components/IconPicker/iconType";
import { RootState } from "../store";

type AddUserCategoryData = {
    color: string;
    icon: IconList;
    name: string;
    userId: number;
};

export type EditUserCategoryData = {
    id: number;
    color: string;
    icon: IconList;
    name: string;
    userId: number;
};

type DeleteUserCategoryData = {
    id: number;
    userId: number;
};

type ErrorWithMessage = {
    message: string;
};

export const getUserCategories = createAsyncThunk<
    any,
    number,
    { state: RootState }
>("category/getUserCategories", async (userId, { getState }) => {
    const { token } = getState().userReducer;
    const res = await fetch(
        `http://localhost:5000/api/category?userId=${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return await res.json();
});

export const addUserCategory = createAsyncThunk<
    any,
    AddUserCategoryData,
    { state: RootState; rejectValue: ErrorWithMessage }
>("category/addUserCategory", async (data, { getState, rejectWithValue }) => {
    const { token } = getState().userReducer;
    const response = await fetch(`http://localhost:5000/api/category`, {
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

export const editUserCategory = createAsyncThunk<
    any,
    EditUserCategoryData,
    { state: RootState; rejectValue: ErrorWithMessage }
>("category/editUserCategory", async (data, { getState, rejectWithValue }) => {
    const { token } = getState().userReducer;
    const response = await fetch(`http://localhost:5000/api/category`, {
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

export const deleteUserCategory = createAsyncThunk<
    any,
    DeleteUserCategoryData,
    { state: RootState; rejectValue: ErrorWithMessage }
>(
    "expenses/deleteUserCategory",
    async (data, { getState, rejectWithValue }) => {
        const { token } = getState().userReducer;
        const response = await fetch(`http://localhost:5000/api/category`, {
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
    }
);
