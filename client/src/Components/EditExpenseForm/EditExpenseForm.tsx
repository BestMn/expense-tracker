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
    currency: string | null;
}

type EditExpenseFormProps = {
    onEdit: (values: EditUserExpenseData) => void;
    currency: string | null;
    editedExpense: TTableExpense;
};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onFinish,
    onCancel,
    editedExpense,
    categoriesList,
    currency,
}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            width={400}
            title="Edit Expense"
            okText="Save"
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
                form={form}
            >
                <Form.Item
                    label="Category"
                    name={["categoryId"]}
                    rules={[
                        { required: true, message: "Please select category!" },
                    ]}
                    initialValue={editedExpense.categoryId}
                >
                    <Select>{categoriesList}</Select>
                </Form.Item>
                <Form.Item
                    name={["amount"]}
                    label="Amount"
                    rules={[
                        { required: true, message: "Please input amount!" },
                    ]}
                    initialValue={editedExpense.amount}
                >
                    <InputNumber min={0} addonAfter={`${currency}`} />
                </Form.Item>
                <Form.Item
                    name={["date"]}
                    label="DatePicker"
                    rules={[{ required: true, message: "Please select date!" }]}
                    initialValue={moment.utc(editedExpense.date, "DD-MM-YYYY")}
                >
                    <DatePicker format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item
                    name={["description"]}
                    label="Description"
                    initialValue={editedExpense.description}
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
            </Form>
        </Modal>
    );
};

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({
    editedExpense,
    currency,
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
                    shape="round"
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
                    currency={currency}
                />
            </div>
        );
    } else {
        return (
            <Button
                type="primary"
                shape="round"
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
