import { useState, useEffect, ReactNode } from "react";

import { Spin, Empty, Skeleton, Button } from "antd";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";
import "./CategoriesList.css";
import { TCategory } from "../../store/reducers/categoriesReducer";
import CategoriesListItemContainer from "../CategoriesListItem/CategoriesListItemContainer";
import CreateCategoryFormContainer from "../CreateCategoryForm/CreateCategoryFormContainer";

type CategoriesListProps = {
    categories: TCategory[] | null;
    loading: boolean;
};

const CategoriesList: React.FC<CategoriesListProps> = ({
    categories,
    loading,
}) => {
    const [categoriesListItems, setCategoriesListItems] = useState<
        ReactNode[] | null
    >(null);

    useEffect(() => {
        if (categories) {
            const items = categories.map((item: TCategory) => {
                return (
                    <CategoriesListItemContainer item={item} key={item.id} />
                );
            });
            setCategoriesListItems(items);
        }
    }, [categories]);

    if (loading) {
        return (
            <div className="categories-list">
                <Skeleton active />
            </div>
        );
    }

    if (categoriesListItems && !categoriesListItems.length) {
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
};

export default CategoriesList;
