import { Form, Input, Modal } from "antd";
import { Colorpicker, ColorPickerValue } from "antd-colorpicker";
import IconPicker from "../IconPicker/IconPicker";
import React, { useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IconList } from "../IconPicker/iconType";
import { TCategory } from "../../store/reducers/categoriesReducer";
import { addUserCategory } from "../../store/actions/categoryActions";

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: TCategory) => void;
    onCancel: (value: boolean) => void;
}

type CreateCategoryFormProps = {
    isEditFormVisible: boolean;
    setIsEditFormVisible: (value: boolean) => void;
};

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
}) => {
    const [iconValue, setIconValue] = useState<IconList>("FaTshirt");

    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => onCancel(false)}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: "public" }}
            >
                <Form.Item
                    name={["name"]}
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input name of category!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={"Choose color"}
                    name={["color"]}
                    rules={[
                        {
                            required: true,
                            message: "Please choose color of category!",
                        },
                    ]}
                >
                    <Colorpicker
                        picker={"CirclePicker"}
                        onColorResult={(color) => color.hex}
                    />
                </Form.Item>
                <Form.Item
                    label={"Choose icon"}
                    name={["icon"]}
                    rules={[
                        {
                            required: true,
                            message: "Please choose icon of category!",
                        },
                    ]}
                >
                    <IconPicker
                        iconValue={iconValue}
                        onChange={(v: IconList) => setIconValue(v)}
                        hideSearch={true}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
    isEditFormVisible,
    setIsEditFormVisible,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { userId } = useSelector((state: RootState) => state.userReducer);

    const onCreate = (category: TCategory) => {
        const newCategory = {
            userId: userId,
            name: category.name,
            icon: category.icon,
            color: category.color,
        };
        dispatch(addUserCategory(newCategory));
        setIsEditFormVisible(false);
    };

    return (
        <CollectionCreateForm
            visible={isEditFormVisible}
            onCreate={onCreate}
            onCancel={setIsEditFormVisible}
        />
    );
};

export default CreateCategoryForm;
