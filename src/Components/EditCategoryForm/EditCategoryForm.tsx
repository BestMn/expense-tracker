import { Button, Form, Input, Modal, Radio } from "antd";
import { Colorpicker, ColorPickerValue } from "antd-colorpicker";
import IconPicker from "../IconPicker/IconPicker";
import { iconList } from "../IconPicker/iconList";
import React, { useState } from "react";
import { AppDispatch } from "./store/store";
import { useDispatch } from "react-redux";
import { editUserCategory } from "../../store/reducers/categoriesReducer";

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
    editedCategory,
}) => {
    const [iconValue, setIconValue] = useState(editedCategory.icon);

    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
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
                    name={["category", "name"]}
                    label="Name"
                    initialValue={editedCategory.name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={"Choose color"}
                    name={["category", "color"]}
                    initialValue={editedCategory.color}
                >
                    <Colorpicker
                        picker={"CirclePicker"}
                        onColorResult={(color) => color.hex}
                    />
                </Form.Item>
                <Form.Item
                    label={"Choose icon"}
                    name={["category", "icon"]}
                    initialValue={editedCategory.icon}
                >
                    <IconPicker
                        iconValue={iconValue}
                        onChange={(v) => setIconValue(v)}
                        hideSearch={true}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const EditCategoryForm: React.FC = ({ editedCategory }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [visible, setVisible] = useState(false);

    const onCreate = ({ category }) => {
        console.log(category);
        const newCategory = {
            userId: 1,
            name: category.name ? category.name : editedCategory.name,
            icon: category.icon ? category.icon : editedCategory.icon,
            color: category.color ? category.color : editedCategory.color,
        };
        const data = {
            body: newCategory,
            id: editedCategory.id,
        };
        dispatch(editUserCategory(data));
        setVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Edit
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                editedCategory={editedCategory}
            />
        </div>
    );
};

export default EditCategoryForm;
