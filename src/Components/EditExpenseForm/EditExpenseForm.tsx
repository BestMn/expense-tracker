import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Radio,
    Select,
} from "antd";
import React, { useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { editUserExpense } from "../../store/reducers/expensesReducer";
import moment from "moment";

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

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const config = {
    rules: [
        {
            type: "object" as const,
            required: true,
            message: "Please select time!",
        },
    ],
};

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onFinish,
    onCancel,
    editedExpense,
    categoriesList,
}) => {
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
                        onFinish(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                // validateMessages={validateMessages}   <<< FIX THIS
                form={form}
            >
                <Form.Item
                    label="Category"
                    name={["expense", "categoryId"]}
                    initialValue={editedExpense.categoryId}
                >
                    <Select>{categoriesList}</Select>
                </Form.Item>
                <Form.Item
                    name={["expense", "amount"]}
                    label="Amount"
                    rules={[{ required: true }]}
                    initialValue={editedExpense.amount}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name={["expense", "date"]}
                    label="DatePicker"
                    initialValue={moment(editedExpense.date)}
                    {...config}
                >
                    <DatePicker format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item
                    name={["expense", "description"]}
                    label="Description"
                    initialValue={editedExpense.description}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const EditExpenseForm: React.FC = ({ editedExpenseId }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [visible, setVisible] = useState(false);

    const { userId } = useSelector((state) => state.userReducer);

    const { categories } = useSelector((state) => state.categoriesReducer);

    const { expenses } = useSelector((state) => state.expensesReducer);

    const editedExpense = expenses.find((elem) => elem.id === editedExpenseId);

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

    const onFinish = ({ expense }) => {
        const newExpense = {
            id: editedExpense.id,
            userId: userId,
            categoryId: expense.categoryId
                ? expense.categoryId
                : editedExpense.categoryId,
            amount: expense.amount ? expense.amount : editedExpense.amount,
            date: expense.date ? expense.date.toJSON() : editedExpense.date,
            description: expense.description ? expense.description : "",
        };
        dispatch(editUserExpense(newExpense));
        setVisible(false);
    };

    if (editedExpense) {
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
                    onFinish={onFinish}
                    onCancel={() => {
                        setVisible(false);
                    }}
                    editedExpense={editedExpense}
                    categoriesList={categoriesList}
                />
            </div>
        );
    } else {
        return (
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Edit
            </Button>
        );
    }
};

export default EditExpenseForm;
