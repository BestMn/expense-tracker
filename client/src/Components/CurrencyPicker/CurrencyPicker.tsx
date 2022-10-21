import { Form, Select } from "antd";
import currencies from "./currencies.json";

const { Option } = Select;

const CurrencyPicker = () => {
    const form = Form.useFormInstance();

    const setCurrency = (value: string) => {
        form.setFieldsValue({ currency: value });
    };
    return (
        <Select
            defaultValue={form.getFieldValue("currency")}
            showSearch
            style={{ width: 200 }}
            size={"large"}
            placeholder="Search to Select"
            onSelect={setCurrency}
            optionFilterProp="children"
            filterOption={(input, option) =>
                (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
            }
        >
            {currencies.map((el) => (
                <Option value={el.symbol} key={el.code}>
                    {`${el.code} (${el.symbol})`}
                </Option>
            ))}
        </Select>
    );
};

export default CurrencyPicker;
