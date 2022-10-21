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
};

const initialState: TCategoryState = {
    loading: false,
    error: null,
    categories: null,
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
                state.categories?.push(action.payload.category);
                state.loading = false;
            })
            .addCase(addUserCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(editUserCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUserCategory.fulfilled, (state, action) => {
                const updatedCategoryInx = state.categories.findIndex(
                    (el) => el.id == action.payload.updatedCategory[1][0].id
                );
                state.categories[updatedCategoryInx] =
                    action.payload.updatedCategory[1][0];
                state.loading = false;
            })
            .addCase(editUserCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteUserCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserCategory.fulfilled, (state, action) => {
                const deletedCategoryInx = state.categories.findIndex(
                    (el) => el.id == action.meta.arg.id
                );
                if (deletedCategoryInx >= 0) {
                    state.categories.splice(deletedCategoryInx, 1);
                }
                state.loading = false;
            })
            .addCase(deleteUserCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});
export const { reducer } = categoriesSlice;
