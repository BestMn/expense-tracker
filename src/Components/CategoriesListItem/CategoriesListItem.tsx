import React from "react";
import EditCategoryFormContainer from "../EditCategoryForm/EditCategoryFormContainer";
import { DeleteFilled } from "@ant-design/icons";
import * as FontIcon from "react-icons/fa";
import "./CategoriesListItem.css";
import { TCategory } from "../../store/reducers/categoriesReducer";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

type CategoriesListItemProps = {
    deleteHandler: (id: number) => void;
    item: TCategory;
};

const { confirm } = Modal;

const CategoriesListItem: React.FC<CategoriesListItemProps> = ({
    deleteHandler,
    item,
}) => {
    const showConfirm = (itemId: number) => {
        confirm({
            title: "Pay attention!",
            icon: <ExclamationCircleOutlined />,
            content:
                "Deleting category will delete all expenses associated with this category.",
            okText: "Delete",
            okButtonProps: {
                danger: true,
                type: "primary",
            },
            onOk: () => deleteHandler(itemId),
        });
    };

    return (
        <div
            id={`${item.id}`}
            className="categories-list__item"
            style={{ backgroundColor: item.color }}
        >
            <div className="categories-list-item__buttons-container">
                <EditCategoryFormContainer editedCategory={item} />
                <DeleteFilled onClick={() => showConfirm(item.id)} />
            </div>
            <span className="categories-list-item__icon">
                {React.createElement(FontIcon[item.icon])}
            </span>
            <span className="categories-list-item__name">{item.name}</span>
        </div>
    );
};

export default CategoriesListItem;
