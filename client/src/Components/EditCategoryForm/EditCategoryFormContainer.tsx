import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import EditCategoryForm from "./EditCategoryForm";
import { editUserCategory } from "../../store/actions/categoryActions";
import { RootState } from "../../store/store";
import { TCategory } from "../../store/reducers/categoriesReducer";
import { EditUserCategoryData } from "../../store/actions/categoryActions";

type EditCategoryFormContainerProps = {
    editedCategory: TCategory;
};

const EditCategoryFormContainer: React.FC<EditCategoryFormContainerProps> = ({
    editedCategory,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { userId } = useSelector((state: RootState) => state.userReducer);

    const onCreate = (category: EditUserCategoryData) => {
        const newCategory = {
            id: editedCategory.id,
            userId: userId,
            name: category.name,
            icon: category.icon,
            color: category.color,
        };
        dispatch(editUserCategory(newCategory))
            .unwrap()
            .catch((rejectedValue) => {
                message.error(rejectedValue.message);
            });
    };

    return (
        <EditCategoryForm onCreate={onCreate} editedCategory={editedCategory} />
    );
};

export default EditCategoryFormContainer;
