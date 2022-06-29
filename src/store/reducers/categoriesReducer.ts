import { createSlice } from "@reduxjs/toolkit";

type Category = {
    id: number;
    name: string;
    icon: string;
    color: string;
};

interface ICategoryState {
    categories: Array<Category>;
}

const initialState: ICategoryState = {
    categories: [{ id: 1, name: "Food", icon: "table", color: "red" }],
};

const categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState,
    reducers: {
        createNewCategory(state) {
            state.categories.push({
                id: 2,
                name: "Food",
                icon: "table",
                color: "red",
            });
        },
    },
});

export const { createNewCategory } = categoriesSlice.actions;
export const { reducer } = categoriesSlice;
