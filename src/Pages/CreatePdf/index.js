import { BLANK_PDF, generate } from "@pdfme/generator";
import { Button, Card, Form, Input, Select } from "antd";
import { CurrencyList } from "assets/data/currencies";
import { useState } from "react";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

const CreatePdf = () => {
  const [form] = Form.useForm();
  const [FormattedValue, setFormattedValue] = useState("");

  const formatter = (values) => {
    let Currency =
      values && values.currency
        ? CurrencyList.find((x) => x.symbol === values.currency)
        : {};
    console.log(Currency);

    let val = values.value
      ? parseFloat(values.value).toFixed(
          Currency && Currency.Currency_Precision
            ? Currency.Currency_Precision
            : 2
        )
      : 0.0;
    let str =
      Currency && Currency.symbol
        ? `${Currency.symbol} ${val}`
        : val;

    return str;
  };

  const onFinish = async (vals) => {
    const val = formatter(vals);
    console.log(vals, val);
    setFormattedValue(val || "");
    /**Empty Document */
    const template = {
      schemas: [
        {
          currency: {
            type: "text",
            position: {
              x: 25.06,
              y: 26.35,
            },
            width: 150,
            height: 18.7,
            fontSize: 24,
            fontColor: "#14b351",
          },
        },
      ],
      basePdf: BLANK_PDF,
    };
    const inputs = [
      {
        currency: `The entered value is :- ${val}`,
      },
    ];

    const pdf = await generate({ template, inputs });

    // Node.js
    // fs.writeFileSync(path.join(__dirname, 'test.pdf'), pdf);

    // Browser
    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));
  };
  return (
    <>
      <Card>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="value"
            label="Value"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="currency"
            label="Currency"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Currency"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {CurrencyList.map((item, i) => (
                <Option value={item.symbol} key={i}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          Entered Value is :-{" "}
          <span style={{ fontWeight: "500" }}> {FormattedValue}</span>
        </div>
      </Card>
    </>
  );
};

export default CreatePdf;
