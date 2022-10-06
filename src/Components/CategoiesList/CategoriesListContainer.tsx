import { message } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCategories } from "../../store/actions/categoryActions";
import { RootState, AppDispatch } from "../../store/store";
import CategoriesList from "./CategoriesList";

const CategoriesListContainer = () => {
    const { userId } = useSelector((state: RootState) => state.userReducer);

    const { categories, loading, shouldUpdate } = useSelector(
        (state: RootState) => state.categoriesReducer
    );

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (shouldUpdate) {
            dispatch(getUserCategories(userId))
                .unwrap()
                .catch((rejectedValue) => {
                    message.error(rejectedValue.message);
                });
        }
    }, [shouldUpdate]);

    return <CategoriesList categories={categories} loading={loading} />;
};

export default CategoriesListContainer;
