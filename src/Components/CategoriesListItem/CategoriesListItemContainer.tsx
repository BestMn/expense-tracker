import { useDispatch, useSelector } from "react-redux";
import { deleteUserCategory } from "../../store/actions/categoryActions";
import { TCategory } from "../../store/reducers/categoriesReducer";
import { AppDispatch, RootState } from "../../store/store";
import CategoriesListItem from "./CategoriesListItem";

type CategoriesListItemContainerProps = {
    item: TCategory;
};

const CategoriesListItemContainer: React.FC<
    CategoriesListItemContainerProps
> = ({ item }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { userId } = useSelector((state: RootState) => state.userReducer);

    const deleteHandler = (id: number) => {
        dispatch(deleteUserCategory({ id, userId }));
    };

    return <CategoriesListItem item={item} deleteHandler={deleteHandler} />;
};

export default CategoriesListItemContainer;
