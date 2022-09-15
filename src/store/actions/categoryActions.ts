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
    async (userId: number) => {
        const res = await fetch(
            `http://localhost:5000/api/category?userId=${userId}`
        );
        return await res.json();
    }
);

export const addUserCategory = createAsyncThunk(
    "category/addUserCategory",
    async (data: AddUserCategoryData) => {
        const res = await fetch(`http://localhost:5000/api/category`, {
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
        return await res.json();
    }
);

export const editUserCategory = createAsyncThunk(
    "category/editUserCategory",
    async (data: EditUserCategoryData) => {
        const res = await fetch(`http://localhost:5000/api/category`, {
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

export const deleteUserCategory = createAsyncThunk(
    "expenses/deleteUserCategory",
    async (data: DeleteUserCategoryData) => {
        const res = await fetch(`http://localhost:5000/api/category`, {
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
