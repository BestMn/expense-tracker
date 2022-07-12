import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Category = {
    id: number;
    name: string;
    icon: string;
    color: string;
};

interface ICategoryState {
    loading: boolean;
    error: any;
    categories: Array<Category> | null;
}

const initialState: ICategoryState = {
    loading: false,
    error: null,
    categories: null,
};

export const getUserCategories = createAsyncThunk(
    "users/getUserCategories",
    async (userId: number) => {
        const res = await fetch(
            `http://localhost:3000/categories?userId=${userId}`
        );
        return await res.json();
    }
);

const categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState,
    reducers: {
        createNewCategory(state) {
            state.categories.push({
                id: 3,
                name: "Cat",
                icon: "table",
                color: "green",
            });
        },
    },
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
            });
    },
});

export const { createNewCategory } = categoriesSlice.actions;
export const { reducer } = categoriesSlice;
