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
    categories: [
        { id: 1, name: "Food", icon: "table", color: "red" },
        { id: 2, name: "Car", icon: "table", color: "blue" },
        { id: 3, name: "House", icon: "table", color: "green" },
        { id: 4, name: "Other", icon: "table", color: "black" },
    ],
};

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
});

export const { createNewCategory } = categoriesSlice.actions;
export const { reducer } = categoriesSlice;
