import React, { useState, useEffect } from "react";
import * as FontIcon from "react-icons/fa";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Spin, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";
import EditCategoryForm from "../EditCategoryForm/EditCategoryForm";
import "./CategoriesList.css";
import { getUserCategories } from "../../store/reducers/categoriesReducer";
import { AppDispatch } from "../../store/store";

type Category = {
    id: number;
    name: string;
    icon: string;
    color: string;
};

const CategoriesList = ({ editable }: { editable: boolean }) => {
    const [categoriesListItems, setCategoriesListItems] = useState(null);
    const [editFormVisible, setEditFormVisible] = useState(false);

    const { token, userId } = useSelector((state: any) => state.userReducer);

    const { categories, loading, error, shouldUpdate } = useSelector(
        (state: any) => state.categoriesReducer
    );

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        console.log(editFormVisible);
    }, [editFormVisible]);

    useEffect(() => {
        if (token && shouldUpdate === true) {
            dispatch(getUserCategories(userId));
        }
    }, [token, shouldUpdate]);

    useEffect(() => {
        if (categories) {
            const items = categories.map((item: any) => {
                return (
                    <div
                        key={item.id}
                        id={item.id}
                        className="categories-list__item"
                        style={{ backgroundColor: item.color }}
                    >
                        <div className="categories-list-item__buttons-container">
                            <EditCategoryForm editedCategory={item} />
                            <DeleteFilled style={{ fontSize: "16px" }} />
                        </div>
                        <span className="categories-list-item__icon">
                            {React.createElement(FontIcon[item.icon])}
                        </span>

                        {/* {item.icon ? (
                            React.createElement(FontIcon[item.icon])
                        ) : (
                            <div />
                        )} */}
                        <span className="categories-list-item__name">
                            {item.name}
                        </span>
                    </div>
                );
            });
            setCategoriesListItems(items);
        }
    }, [categories]);

    if (loading) {
        return <Spin />;
    }

    return (
        <div className={"categories-list-container"}>
            {categoriesListItems ? categoriesListItems : <Empty />}
            <div
                onClick={() => {
                    setEditFormVisible(true);
                }}
                className="categories-list__item"
            >
                <CreateCategoryForm
                    editFormVisible={editFormVisible}
                    setEditFormVisible={setEditFormVisible}
                />
            </div>
        </div>
    );
};

export default CategoriesList;
