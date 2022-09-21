import { Form, Input, Modal } from "antd";
import { Colorpicker } from "antd-colorpicker";
import IconPicker from "../IconPicker/IconPicker";
import { EditFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { EditUserCategoryData } from "../../store/actions/categoryActions";
import { IconList } from "../IconPicker/iconType";

type CollectionCreateFormProps = {
    visible: boolean;
    onCreate: (values: EditUserCategoryData) => void;
    onCancel: () => void;
    editedCategory: EditUserCategoryData;
};

type EditCategoryFormProps = {
    editedCategory: EditUserCategoryData;
    onCreate: (values: EditUserCategoryData) => void;
};

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
    editedCategory,
}) => {
    const [iconValue, setIconValue] = useState<IconList>(editedCategory.icon);

    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            width={350}
            title="Edit Category"
            okText="Save"
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
                initialValues={editedCategory}
            >
                <Form.Item name={["name"]} label="Name">
                    <Input />
                </Form.Item>
                <Form.Item label={"Choose color"} name={["color"]}>
                    <Colorpicker
                        picker={"CirclePicker"}
                        onColorResult={(color) => color.hex}
                    />
                </Form.Item>
                <Form.Item label={"Choose icon"} name={["icon"]}>
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

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({
    editedCategory,
    onCreate,
}) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <EditFilled
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Edit
            </EditFilled>
            <CollectionCreateForm
                visible={visible}
                onCreate={(values) => {
                    onCreate(values);
                    setVisible(false);
                }}
                onCancel={() => {
                    setVisible(false);
                }}
                editedCategory={editedCategory}
            />
        </>
    );
};

export default EditCategoryForm;
