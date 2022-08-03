import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { setToken, setUserId } from "../store/reducers/userReducer";

const storageName = 'userData'

export const useAuth = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { token, userId } = useSelector((state: any) => state.userReducer);

    useEffect(()=>{
        const data = JSON.parse.localStorage.getItem(storageName)
        if (data && data.token) {
            login(data.token, data.userId)
        }
    },[login])

    const login = useCallback((jwtToken, id)=> {
        dispatch(setToken(jwtToken))
        dispatch(setUserId(id))

        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken}))
    },[login])

    const logout = useCallback(()=> {
        dispatch(setToken(null))
        dispatch(setUserId(null))

        localStorage.removeItem(storageName)
    },[logout])
}