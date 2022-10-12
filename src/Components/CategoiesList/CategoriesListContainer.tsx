import { Skeleton } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CategoriesList from "./CategoriesList";

const CategoriesListContainer = () => {
    const { categories, loading } = useSelector(
        (state: RootState) => state.categoriesReducer
    );

    if (loading) {
        return (
            <div className="categories-list">
                <Skeleton active />
            </div>
        );
    }

    return <CategoriesList categories={categories} />;
};

export default CategoriesListContainer;
