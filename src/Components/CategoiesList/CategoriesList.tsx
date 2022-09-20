import { useState, useEffect, ReactNode } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Spin, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";
import CategoriesListItem from "../CategoriesListItem/CategoriesListItem";
import { AppDispatch } from "../../store/store";
import "./CategoriesList.css";
import { getUserCategories } from "../../store/actions/categoryActions";
import { RootState } from "../../store/store";
import { TCategory } from "../../store/reducers/categoriesReducer";

const CategoriesList = () => {
    const [categoriesListItems, setCategoriesListItems] =
        useState<Array<ReactNode> | null>(null);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);

    const { userId } = useSelector((state: RootState) => state.userReducer);

    const { categories, loading, error, shouldUpdate } = useSelector(
        (state: RootState) => state.categoriesReducer
    );

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (shouldUpdate === true) {
            dispatch(getUserCategories(userId));
        }
    }, [shouldUpdate]);

    useEffect(() => {
        if (categories) {
            const items = categories.map((item: TCategory) => {
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
