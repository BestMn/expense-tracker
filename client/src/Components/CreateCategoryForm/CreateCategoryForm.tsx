import { Alert, Button, Form, Input, Modal } from "antd";
import { Colorpicker } from "antd-colorpicker";
import IconPicker from "../IconPicker/IconPicker";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { IconList } from "../IconPicker/iconType";
import { TCategory } from "../../store/reducers/categoriesReducer";

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: TCategory) => void;
    onCancel: (value: boolean) => void;
}

type CreateCategoryFormProps = {
    onCreate: (values: TCategory) => void;
    empty?: boolean;
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
            width={350}
            title="New Category"
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
    onCreate,
    empty,
}) => {
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    return (
        <>
            {empty ? (
                <Button
                    type="primary"
                    onClick={() => {
                        setIsEditFormVisible(true);
                    }}
                >
                    Create Now
                </Button>
            ) : (
                <div
                    onClick={() => {
                        setIsEditFormVisible(true);
                    }}
                    className="categories-list__add-btn"
                >
                    <PlusOutlined />
                </div>
            )}
            <CollectionCreateForm
                visible={isEditFormVisible}
                onCreate={onCreate}
                onCancel={setIsEditFormVisible}
            />
        </>
    );
};

export default CreateCategoryForm;
