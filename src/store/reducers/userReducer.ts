import { createSlice } from "@reduxjs/toolkit";
import {
    getUserInfo,
    userRegistration,
    userLogin,
    checkUser,
    editUser,
} from "../actions/userActions";

export type TUserState = {
    initialTokenChecked: boolean;
    token: string | null;
    userId: number;
    loading: boolean;
    error: any;
    firstName: string | null;
    secondName: string | null;
    nickName: string | null;
    phoneNumber: string | null;
    email: string | null;
    currency: string | null;
};

const initialState: TUserState = {
    initialTokenChecked: false,
    token: null,
    userId: null,
    loading: false,
    error: null,
    firstName: null,
    secondName: null,
    nickName: null,
    phoneNumber: null,
    email: null,
    currency: null,
};

const categoriesSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setInitialTokenChecked: (state, action) => {
            state.initialTokenChecked = action.payload;
        },
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
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.firstName = payload.firstName;
                state.secondName = payload.secondName;
                state.nickName = payload.nickName;
                state.phoneNumber = payload.phoneNumber;
                state.email = payload.email;
                state.currency = payload.userCurrency;
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
            })

            .addCase(editUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUser.fulfilled, (state, { payload }) => {
                const {
                    firstName,
                    secondName,
                    nickName,
                    phoneNumber,
                    email,
                    userCurrency,
                } = payload[1][0];
                state.loading = false;
                state.firstName = firstName;
                state.secondName = secondName;
                state.nickName = nickName;
                state.phoneNumber = phoneNumber;
                state.email = email;
                state.currency = userCurrency;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const { setToken, setUserId, setInitialTokenChecked } =
    categoriesSlice.actions;
export const { reducer } = categoriesSlice;
