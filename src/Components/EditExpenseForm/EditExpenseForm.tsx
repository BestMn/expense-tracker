import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
} from "antd";
import React, { ReactElement, useState } from "react";
import moment from "moment";
import { EditUserExpenseData } from "../../store/actions/expenseActions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TTableExpense } from "../ExpensesTable/ExpensesTable";

interface CollectionCreateFormProps {
    visible: boolean;
    onFinish: (values: EditUserExpenseData) => void;
    onCancel: () => void;
    editedExpense: TTableExpense;
    categoriesList: Array<ReactElement> | ReactElement;
}

type EditExpenseFormProps = {
    onEdit: (values: EditUserExpenseData) => void;
    editedExpense: TTableExpense;
};

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
                        onFinish({
                            ...values,
                            id: editedExpense.id,
                            date: values.date.toJSON(),
                        });
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form
                {...layout}
                name="nest-messages"
                onFinish={(values) => {
                    onFinish({
                        ...values,
                        id: editedExpense.id,
                    });
                }}
                // validateMessages={validateMessages}   <<< FIX THIS
                form={form}
            >
                <Form.Item
                    label="Category"
                    name={["categoryId"]}
                    initialValue={editedExpense.categoryId}
                >
                    <Select>{categoriesList}</Select>
                </Form.Item>
                <Form.Item
                    name={["amount"]}
                    label="Amount"
                    rules={[{ required: true }]}
                    initialValue={editedExpense.amount}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name={["date"]}
                    label="DatePicker"
                    initialValue={moment.utc(editedExpense.date, "DD-MM-YYYY")}
                    {...config}
                >
                    <DatePicker format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item
                    name={["description"]}
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

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({
    editedExpense,
    onEdit,
}) => {
    const [visible, setVisible] = useState(false);
    const { categories } = useSelector(
        (state: RootState) => state.categoriesReducer
    );

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
                    onFinish={(value) => {
                        setVisible(false);
                        onEdit(value);
                    }}
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
