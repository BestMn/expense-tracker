import { useState, useEffect, ReactNode } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Spin, Empty, Skeleton, Button } from "antd";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";
import "./CategoriesList.css";
import { TCategory } from "../../store/reducers/categoriesReducer";
import CategoriesListItemContainer from "../CategoriesListItem/CategoriesListItemContainer";

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
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);

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

    if (!categoriesListItems?.length) {
        return (
            <div className="categories-list">
                <Empty description={"There are no categories yet"}>
                    <Button
                        onClick={() => {
                            setIsEditFormVisible(true);
                        }}
                        type="primary"
                    >
                        Create Now
                    </Button>
                </Empty>
                <CreateCategoryForm
                    isEditFormVisible={isEditFormVisible}
                    setIsEditFormVisible={setIsEditFormVisible}
                />
            </div>
        );
    }

    return (
        <div className="categories-list">
            <div className="categories-list__content">
                {categoriesListItems}
                <div
                    onClick={() => {
                        setIsEditFormVisible(true);
                    }}
                    className="categories-list__add-btn"
                >
                    <PlusOutlined />
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
