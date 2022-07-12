import React, { createContext, useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { getUserExpenses } from "./store/reducers/expensesReducer";
import { getUserCategories } from "./store/reducers/categoriesReducer";
import { getUserInfo } from "./store/reducers/userReducer";
import DashboardPage from "./Pages/DashboardPage";
import ExpensesPage from "./Pages/ExpensesPage";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUserInfo(1));
        dispatch(getUserCategories(1));
        dispatch(getUserExpenses(1));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
