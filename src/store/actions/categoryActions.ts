import { createAsyncThunk } from "@reduxjs/toolkit";
import { IconList } from "../../Components/IconPicker/iconType";

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

export const getUserCategories = createAsyncThunk(
    "category/getUserCategories",
    async (userId: number, { getState }) => {
        const { token } = getState().userReducer;
        const res = await fetch(
            `http://localhost:5000/api/category?user!Id=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return await res.json();
    }
);

export const addUserCategory = createAsyncThunk(
    "category/addUserCategory",
    async (data: AddUserCategoryData, { getState, rejectWithValue }) => {
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
    }
);

export const editUserCategory = createAsyncThunk(
    "category/editUserCategory",
    async (data: EditUserCategoryData, { getState, rejectWithValue }) => {
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
    }
);

export const deleteUserCategory = createAsyncThunk(
    "expenses/deleteUserCategory",
    async (data: DeleteUserCategoryData, { getState }) => {
        const { token } = getState().userReducer;
        const res = await fetch(`http://localhost:5000/api/category`, {
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
        return await res.json();
    }
);
