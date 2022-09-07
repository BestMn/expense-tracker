import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Spin, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";
import EditCategoryForm from "../EditCategoryForm/EditCategoryForm";
import CategoriesListItem from "../CategoriesListItem/CategoriesListItem";
import { getUserCategories } from "../../store/reducers/categoriesReducer";
import { AppDispatch } from "../../store/store";
import "./CategoriesList.css";

type Category = {
    id: number;
    name: string;
    icon: string;
    color: string;
};

const CategoriesList = () => {
    const [categoriesListItems, setCategoriesListItems] = useState(null);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);

    const { token, userId } = useSelector((state: any) => state.userReducer);

    const { categories, loading, error, shouldUpdate } = useSelector(
        (state: any) => state.categoriesReducer
    );

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (token && shouldUpdate === true) {
            dispatch(getUserCategories(userId));
        }
    }, [token, shouldUpdate]);

    useEffect(() => {
        if (categories) {
            const items = categories.map((item: any) => {
                return <CategoriesListItem item={item} key={item.id} />;
            });
            setCategoriesListItems(items);
        }
    }, [categories]);

    if (loading) {
        return <Spin />;
    }

    return (
        <div className="categories-list">
            <h2>My Categories</h2>
            <div className="categories-list__content">
                {categoriesListItems ? categoriesListItems : <Empty />}
                <div
                    onClick={() => {
                        setIsEditFormVisible(true);
                    }}
                    className="categories-list__add-btn"
                >
                    <PlusOutlined className="categories-list-item__icon" />
                </div>
                <CreateCategoryForm
                    isEditFormVisible={isEditFormVisible}
                    setIsEditFormVisible={setIsEditFormVisible}
                />
            </div>
        </div>
    );
};

export default CategoriesList;
