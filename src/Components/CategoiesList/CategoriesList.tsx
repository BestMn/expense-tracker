import React, { useState, useEffect } from "react";
import * as FontIcon from "react-icons/fa";
import { Spin, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";
import EditCategoryForm from "../EditCategoryForm/EditCategoryForm";
import "./CategoriesList.css";

type Category = {
    id: number;
    name: string;
    icon: string;
    color: string;
};

const CategoriesList = ({ editable }: { editable: boolean }) => {
    const [categoriesListItems, setCategoriesListItems] = useState(null);

    const { categories, loading, error } = useSelector(
        (state: any) => state.categoriesReducer
    );

    const dispatch = useDispatch();

    const edit = editable ? <EditCategoryForm /> : null;

    const addCategory = editable ? (
        // <div
        //     className="expense-item"
        //     onClick={() => dispatch(createNewCategory())}
        // ></div>
        <CreateCategoryForm />
    ) : null;

    useEffect(() => {
        if (categories) {
            const items = categories.map((item: any) => {
                return (
                    <div
                        key={item.id}
                        id={item.id}
                        className="categories-list-item"
                        style={{ backgroundColor: item.color }}
                    >
                        <EditCategoryForm editedCategory={item} />
                        {item.icon ? (
                            React.createElement(FontIcon[item.icon])
                        ) : (
                            <div />
                        )}
                        <span>{item.name}</span>
                    </div>
                );
            });
            setCategoriesListItems(items);
        }
    }, [categories]);

    return (
        <div className={"categories-list-container"}>
            {loading ? (
                <Spin />
            ) : categoriesListItems ? (
                categoriesListItems
            ) : (
                <Empty />
            )}
            {addCategory}
        </div>
    );
};

export default CategoriesList;
