import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CategoriesList from "./CategoriesList";

const CategoriesListContainer = () => {
    const { categories, loading } = useSelector(
        (state: RootState) => state.categoriesReducer
    );

    return <CategoriesList categories={categories} loading={loading} />;
};

export default CategoriesListContainer;
