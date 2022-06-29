import { configureStore } from "@reduxjs/toolkit";
import { reducer as categoriesReducer } from "./reducers/categoriesReducer";
import { reducer as expensesReducer } from "./reducers/expensesReducer";

const store = configureStore({
    reducer: { categoriesReducer, expensesReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: true,
            serializableCheck: false,
            thunk: true,
        }),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
