import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/categoriesReducer";

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: true,
            serializableCheck: false,
            thunk: true,
        }),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
