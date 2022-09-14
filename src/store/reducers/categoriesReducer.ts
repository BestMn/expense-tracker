import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export type TCategory = {
    id?: number;
    userId: number;
    name: string;
    icon: string;
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
    async (data: TCategory) => {
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
    async (data) => {
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
    async (data) => {
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
