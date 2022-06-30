import React from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { createNewCategory } from "../../store/reducers/categoriesReducer";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";

type Category = {
    id: number;
    name: string;
    icon: string;
    color: string;
};

const CategoriesList = ({ editable }: { editable: boolean }) => {
    const categories = useSelector(
        (state: any) => state.categoriesReducer.categories
    );

    const dispatch = useDispatch();

    const edit = editable ? <span>edit</span> : null;

    const addCategory = editable ? (
        // <div
        //     className="expense-item"
        //     onClick={() => dispatch(createNewCategory())}
        // ></div>
        <CreateCategoryForm />
    ) : null;

    const items = categories.map((item: any) => {
        return (
            <div
                key={item.id}
                id={item.id}
                className="expense-item"
                style={{ backgroundColor: item.color }}
            >
                {edit}
                <EnvironmentOutlined
                    style={{
                        fontSize: "50px",
                        color: "white",
                        display: "block",
                    }}
                />
                <span>{item.name}</span>
            </div>
        );
    });

    return (
        <div style={{ display: "flex" }}>
            {items}
            {addCategory}
        </div>
    );
};

export default CategoriesList;
