import { Button, Form, Input, Modal, Radio } from "antd";
import { Colorpicker, ColorPickerValue } from "antd-colorpicker";
import IconPicker from "../IconPicker/IconPicker";
import { iconList } from "../IconPicker/iconList";
import React, { useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addUserCategory } from "../../store/reducers/categoriesReducer";

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
}) => {
    const [iconValue, setIconValue] = useState("FaTshirt");

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
                    rules={[
                        {
                            required: true,
                            message: "Please input name of category!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label={"Choose color"} name={["category", "color"]}>
                    <Colorpicker
                        picker={"CirclePicker"}
                        onColorResult={(color) => color.hex}
                    />
                </Form.Item>
                <Form.Item label={"Choose icon"} name={["category", "icon"]}>
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

const CreateCategoryForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { userId } = useSelector((state: any) => state.userReducer);

    const [visible, setVisible] = useState(false);

    const onCreate = ({ category }) => {
        const newCategory = {
            userId: userId,
            name: category.name,
            icon: category.icon,
            color: category.color,
        };
        dispatch(addUserCategory(newCategory));
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
                New Category
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default CreateCategoryForm;
