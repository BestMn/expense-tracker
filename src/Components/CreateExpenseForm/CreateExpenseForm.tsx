import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Button, Form, Input, Select, InputNumber, DatePicker } from "antd";
import { addUserExpenses } from "../../store/reducers/expensesReducer";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};
/* eslint-enable no-template-curly-in-string */

const config = {
    rules: [
        {
            type: "object" as const,
            required: true,
            message: "Please select time!",
        },
    ],
};

const CreateExpenseForm: React.FC = ({ categories }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { userId } = useSelector((state: any) => state.userReducer);
    const [form] = Form.useForm();
    const onFinish = ({ expense }) => {
        const data = {
            userId: userId,
            date: expense.date.toJSON(),
            amount: expense.amount,
            categoryId: expense.categoryId,
            description: expense.description ? expense.description : "",
        };
        dispatch(addUserExpenses(data));
        form.resetFields();
    };

    const categoriesList = categories ? (
        categories.map((elem) => {
            return (
                <Select.Option value={elem.id} key={elem.id}>
                    {elem.name}
                </Select.Option>
            );
        })
    ) : (
        <Select.Option value={"elem.id"} key={"elem.id"}>
            Add Category
        </Select.Option>
    );
    // FIX THIS ^^^^^^^^^^^^^^

    return (
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            form={form}
        >
            <Form.Item label="Category" name={["expense", "categoryId"]}>
                <Select>{categoriesList}</Select>
            </Form.Item>
            <Form.Item
                name={["expense", "amount"]}
                label="Amount"
                rules={[{ required: true }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name={["expense", "date"]}
                label="DatePicker"
                {...config}
            >
                <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item name={["expense", "description"]} label="Description">
                <Input.TextArea />
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
