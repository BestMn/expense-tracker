import { createSlice, current } from "@reduxjs/toolkit";
import { IconList } from "../../Components/IconPicker/iconType";
import {
    getUserCategories,
    addUserCategory,
    editUserCategory,
    deleteUserCategory,
} from "../actions/categoryActions";

export type TCategory = {
    id: number;
    userId: number;
    name: string;
    icon: IconList;
    color: string;
};

export type TCategoryState = {
    loading: boolean;
    error: any;
    categories: Array<TCategory> | null;
    shouldUpdate: boolean;
};

const initialState: TCategoryState = {
    loading: false,
    error: null,
    categories: null,
    shouldUpdate: true,
};

const categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.shouldUpdate = false;
                if (
                    JSON.stringify(current(state).categories) ==
                    JSON.stringify(action.payload)
                ) {
                    return;
                }
                state.categories = action.payload;
            })
            .addCase(getUserCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addUserCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUserCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories?.push(action.payload);
            })
            .addCase(addUserCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(editUserCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUserCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.shouldUpdate = true;
            })
            .addCase(editUserCategory.rejected, (state, action) => {
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
                console.log(action.error);
                state.error = action.error;
            });
    },
});

export const { createNewCategory } = categoriesSlice.actions;
export const { reducer } = categoriesSlice;
