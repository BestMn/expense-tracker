import { createSlice } from "@reduxjs/toolkit";

type Category = {
    id: number;
    name: string;
    color: string;
};

interface ICategoryState {
    categories: Array<Category>;
}

const initialCategories: ICategoryState = {
    categories: [{ id: 1, name: "Food", color: "red" }],
};

const categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState: initialCategories,
    reducers: {
        createNewCategory(state) {
            state.categories.push({ id: 2, name: "Food", color: "red" });
        },
    },
});

export const { createNewCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
