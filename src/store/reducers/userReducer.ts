import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserInfo {
    loading: boolean;
    error: any;
    name: string | null;
    currency: string;
}

const initialState: UserInfo = {
    loading: false,
    error: null,
    name: null,
    currency: "₽",
};

export const getUserInfo = createAsyncThunk(
    "users/getUserInfo",
    async (userId: number) => {
        const res = await fetch(`http://localhost:3000/users/${userId}`);
        const json = await res.json();
        return { name: json.name, currency: json.currency };
    }
);

const categoriesSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.name = action.payload.name;
                state.currency = action.payload.currency;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const {} = categoriesSlice.actions;
export const { reducer } = categoriesSlice;
