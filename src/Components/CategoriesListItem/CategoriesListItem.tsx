import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import EditCategoryForm from "../EditCategoryForm/EditCategoryForm";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import * as FontIcon from "react-icons/fa";
import { deleteUserCategory } from "../../store/reducers/categoriesReducer";
import "./CategoriesListItem.css";

const CategoriesListItem = ({ item }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { userId } = useSelector((state) => state.userReducer);

    const deleteHandler = (id) => {
        dispatch(deleteUserCategory({ id, userId }));
    };

    return (
        <div
            id={item.id}
            className="categories-list__item"
            style={{ backgroundColor: item.color }}
        >
            <div className="categories-list-item__buttons-container">
                <EditCategoryForm editedCategory={item} />
                <DeleteFilled
                    style={{ fontSize: "16px" }}
                    onClick={() => deleteHandler(item.id)}
                />
            </div>
            <span className="categories-list-item__icon">
                {React.createElement(FontIcon[item.icon])}
            </span>
            <span className="categories-list-item__name">{item.name}</span>
        </div>
    );
};

export default CategoriesListItem;
