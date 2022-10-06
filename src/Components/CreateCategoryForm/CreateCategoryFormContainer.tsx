import { message } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserCategory } from "../../store/actions/categoryActions";
import { TCategory } from "../../store/reducers/categoriesReducer";
import { AppDispatch, RootState } from "../../store/store";
import CreateCategoryForm from "./CreateCategoryForm";

const CreateCategoryFormContainer: React.FC<{ empty?: boolean }> = ({
    empty,
}) => {
    const dispatch = useDispatch<AppDispatch>();

    const { userId } = useSelector((state: RootState) => state.userReducer);

    const onCreate = useCallback(
        () => (category: TCategory) => {
            const newCategory = {
                userId: userId,
                name: category.name,
                icon: category.icon,
                color: category.color,
            };
            dispatch(addUserCategory(newCategory))
                .unwrap()
                .catch((rejectedValue) => {
                    message.error(rejectedValue.message);
                });
        },
        []
    );
    return <CreateCategoryForm onCreate={onCreate()} empty={empty} />;
};
export default CreateCategoryFormContainer;
