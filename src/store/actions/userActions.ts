import { createAsyncThunk } from "@reduxjs/toolkit";

export type UserRegistrationData = {
    nickName: string;
    email: string;
    password: string;
    firstName?: string;
    secondName?: string;
    phoneNumber?: string;
    currency?: string;
};

export type UserLoginData = {
    email: string;
    password: string;
};

export type EditUserData = {
    id: string | number;
    nickName: string;
    firstName: string;
    secondName: string;
    phoneNumber: string;
    currency: string;
};

export const userRegistration = createAsyncThunk(
    "user/registration",
    async (data: UserRegistrationData) => {
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

export const userLogin = createAsyncThunk(
    "user/login",
    async (data: UserLoginData) => {
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
    }
);

export const getUserInfo = createAsyncThunk(
    "users/getUserInfo",
    async (userId: number) => {
        const res = await fetch(
            `http://localhost:5000/api/user?userId=${userId}`
        );
        return await res.json();
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

export const editUser = createAsyncThunk(
    "users/editUser",
    async (data: EditUserData) => {
        const res = await fetch(`http://localhost:5000/api/user/`, {
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