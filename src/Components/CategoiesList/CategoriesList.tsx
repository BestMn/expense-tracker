import { useState, useEffect, ReactNode } from "react";
import { Empty } from "antd";
import "./CategoriesList.css";
import { TCategory } from "../../store/reducers/categoriesReducer";
import CategoriesListItemContainer from "../CategoriesListItem/CategoriesListItemContainer";
import CreateCategoryFormContainer from "../CreateCategoryForm/CreateCategoryFormContainer";
import React from "react";

type CategoriesListProps = {
    categories: TCategory[] | null;
};

const CategoriesList: React.FC<CategoriesListProps> = React.memo(
    ({ categories }) => {
        const [categoriesListItems, setCategoriesListItems] = useState<
            ReactNode[] | null
        >(null);

        useEffect(() => {
            if (categories?.length) {
                const items = categories.map((item: TCategory) => {
                    return (
                        <CategoriesListItemContainer
                            item={item}
                            key={item.id}
                        />
                    );
                });
                setCategoriesListItems(items);
            }
        }, [categories]);

        if (!categories?.length) {
            return (
                <div className="categories-list">
                    <Empty description={"There are no categories yet"}>
                        <CreateCategoryFormContainer empty />
                    </Empty>
                </div>
            );
        }

        return (
            <div className="categories-list">
                <div className="categories-list__content">
                    {categoriesListItems}
                    <CreateCategoryFormContainer />
                </div>
            </div>
        );
    }
);

export default CategoriesList;
