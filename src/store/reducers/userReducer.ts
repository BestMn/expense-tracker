import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserInfo {
    token: string | null;
    userId: string | null;
    loading: boolean;
    error: any;
    name: string | null;
    currency: string;
}

const initialState: UserInfo = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    name: null,
    currency: "₽",
};

export const userRegistration = createAsyncThunk(
    "user/registration",
    async (data = {}) => {
        const response = await fetch(
            `http://localhost:5000/api/user/registration`,
            {
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
            }
        );
        console.log(response.json());
        return await response.json();
    }
);

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
            })
            .addCase(userRegistration.pending, (state) => {
                state.loading = true;
            })
            .addCase(userRegistration.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.userId = action.payload.userId;
                state.currency = action.payload.currency;
            })
            .addCase(userRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const {} = categoriesSlice.actions;
export const { reducer } = categoriesSlice;
