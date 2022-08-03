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
            `http://localhost:5000/api/category?userId=${userId}`
        );
        return await res.json();
    }
);

export const addUserCategory = createAsyncThunk(
    "expenses/addUserCategory",
    async (data = {}) => {
        const response = await fetch(`http://localhost:5000/api/category`, {
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
        return await response.json();
    }
);

export const editUserCategory = createAsyncThunk(
    "expenses/editUserCategory",
    async ({ body, id } = {}) => {
        const response = await fetch(`http://localhost:3000/categories/${id}`, {
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
            body: JSON.stringify(body),
        });
        return await response.json();
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
                console.log("pending");
                state.loading = true;
            })
            .addCase(getUserCategories.fulfilled, (state, action) => {
                state.loading = false;
                console.log("full");
                state.categories = action.payload;
            })
            .addCase(getUserCategories.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error);
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
                const editedCategoryInx = state.categories?.findIndex(
                    (elem) => elem.id == action.payload.id
                );
                state.categories[editedCategoryInx] = action.payload;
            })
            .addCase(editUserCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const { createNewCategory } = categoriesSlice.actions;
export const { reducer } = categoriesSlice;
