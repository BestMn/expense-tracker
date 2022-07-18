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

export const addUserCategory = createAsyncThunk(
    "expenses/addUserCategory",
    async (data = {}) => {
        const response = await fetch(`http://localhost:3000/categories`, {
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
    async (data = {}) => {
        console.log(id);
        const response = await fetch(
            `http://localhost:3000/categories/${data.id}`,
            {
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
                body: JSON.stringify(data.body),
            }
        );
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
                console.log(action);
            })
            .addCase(editUserCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const { createNewCategory } = categoriesSlice.actions;
export const { reducer } = categoriesSlice;
