import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserInfo {
    token: string | null;
    userId: string | null;
    loading: boolean;
    error: any;
    name: string | null;
    currency: string | null;
}

const initialState: UserInfo = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    name: null,
    currency: null,
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
        const res = await response.json();
        localStorage.setItem("userData", JSON.stringify({ token: res.token }));
        return res;
    }
);

export const userLogin = createAsyncThunk("user/login", async (data = {}) => {
    const response = await fetch(`http://localhost:5000/api/user/login`, {
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
    const res = await response.json();
    localStorage.setItem("userData", JSON.stringify({ token: res.token }));
    return res;
});

export const getUserInfo = createAsyncThunk(
    "users/getUserInfo",
    async (userId: number) => {
        const res = await fetch(`http://localhost:5000/api/user?id=${userId}`);
        return await res.json();
        // return { name: json.name, currency: json.userCurrency };
    }
);

export const checkUser = createAsyncThunk(
    "users/checkUser",
    async (token: string) => {
        const response = await fetch(`http://localhost:5000/api/user/auth`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        const res = await response.json();
        localStorage.setItem("userData", JSON.stringify({ token: res.token }));
        return { token: res.token, userId: res.userId };
    }
);

const categoriesSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.name = action.payload.userName;
                state.currency = action.payload.userCurrency;
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
                state.currency = action.payload.userCurrency;
            })
            .addCase(userRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.userId = action.payload.userId;
                state.currency = action.payload.userCurrency;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(checkUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.userId = action.payload.userId;
                state.loading = false;
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const { setToken, setUserId } = categoriesSlice.actions;
export const { reducer } = categoriesSlice;
