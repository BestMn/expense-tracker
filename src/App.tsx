import React, { createContext, useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserExpenses } from "./store/reducers/expensesReducer";
import { getUserCategories } from "./store/reducers/categoriesReducer";
import { AppDispatch } from "./store/store";
import DashboardPage from "./Pages/DashboardPage";
import ExpensesPage from "./Pages/ExpensesPage";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
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
