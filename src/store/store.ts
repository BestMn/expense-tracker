import { configureStore } from "@reduxjs/toolkit";
import { reducer as categoriesReducer } from "./reducers/categoriesReducer";
import { reducer as expensesReducer } from "./reducers/expensesReducer";
import { reducer as userReducer } from "./reducers/userReducer";

const store = configureStore({
    reducer: { categoriesReducer, expensesReducer, userReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: true,
            serializableCheck: false,
            thunk: true,
        }),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
