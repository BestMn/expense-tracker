import React from "react";
import {
    Button,
    Form,
    Input,
    Select,
    InputNumber,
    DatePicker,
    Empty,
} from "antd";
import { TCategory } from "../../store/reducers/categoriesReducer";

type CreateExpenseFormProps = {
    categories: TCategory[] | null;
    currency: string;
    onFinish: (values: any) => void;
};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({
    categories,
    onFinish,
    currency,
}) => {
    const [form] = Form.useForm();

    const categoriesList = categories?.map((elem) => {
        return (
            <Select.Option value={elem.id} key={elem.id}>
                {elem.name}
            </Select.Option>
        );
    });

    // FIX THIS ^^^^^^^^^^^^^^

    return (
        <Form
            {...layout}
            name="nest-messages"
            onFinish={(values) => {
                onFinish({ ...values, date: values.date.toJSON() });
                form.resetFields();
            }}
            form={form}
        >
            <Form.Item
                label="Category"
                name={["categoryId"]}
                rules={[{ required: true, message: "Please select category!" }]}
            >
                <Select>{categoriesList}</Select>
            </Form.Item>
            <Form.Item
                name={["amount"]}
                label="Amount"
                rules={[{ required: true, message: "Please input amount!" }]}
            >
                <InputNumber min={0} addonAfter={`${currency}`} />
            </Form.Item>
            <Form.Item
                name={["date"]}
                label="DatePicker"
                rules={[{ required: true, message: "Please select date!" }]}
            >
                <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
                name={["description"]}
                label="Description"
                rules={[
                    {
                        max: 250,
                        message:
                            "Description must be less than 250 characters!",
                    },
                ]}
            >
                <Input.TextArea showCount maxLength={250} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateExpenseForm;
