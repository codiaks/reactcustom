import { BLANK_PDF, generate } from "@pdfme/generator";
import { Button, Card, Form, Input, Select, Table } from "antd";
import { CurrencyList } from "assets/data/currencies";
import { useEffect, useState } from "react";
import DejaVuSansFont from "assets/fonts/DejaVuSans.ttf";
import DubaiRegularFont from "assets/fonts/Dubai-Regular.ttf";
import FreeSerifFont from "assets/fonts/FreeSerif.ttf";
import OpenSansRegularFont from "assets/fonts/OpenSans-Regular.ttf";
import NotoNaskhArabicUIRegularFont from "assets/fonts/NotoNaskhArabicUI-Regular.ttf";
import AliceRegularFont from "assets/fonts/Alice-Regular.ttf";
import RobotoRegularFont from "assets/fonts/Roboto-Regular.ttf";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  const [newCurrency, setnewCurrency] = useState([]);
  const codes = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BOV",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHE",
    "CHF",
    "CHW",
    "CLF",
    "CLP",
    "CNH",
    "CNY",
    "COP",
    "COU",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRO",
    "MUR",
    "MWK",
    "MXN",
    "MXV",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "USN",
    "UYI",
    "UYU",
    "UZS",
    "VEF",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
  ];

  useEffect(() => {
    //let arr = [];
    //CurrencyList.forEach((el) => {
    //let {str,classn} = formatter(500);
    for (let i = 0; i < CurrencyList.length; i++) {
      let el = CurrencyList[i];
      let classn = getCurrencyClass(el);
      // let str =
      //   el && el.symbol
      //     ? `<span class="${classn}"> ${
      //         el.symbol
      //       }</span> ${500} (<span class="${classn}">${
      //         el.symbol_native
      //       }</span>)`
      //     : 500;
      let str =
        el && el.symbol ? `${el.symbol} ${500} (${el.symbol_native})` : 500;
      el.value = str;
      CurrencyList[i] = el;
      //arr.push(el);
    }
    setnewCurrency(CurrencyList);
    //console.log(CurrencyList);
    //});
  }, []);

  const formatter = (values) => {
    let Currency =
      values && values.currency
        ? CurrencyList.find((x) => x.symbol === values.currency)
        : {};

    let val = values.value
      ? parseFloat(values.value).toFixed(
          Currency && Currency.Currency_Precision
            ? Currency.Currency_Precision
            : 2
        )
      : 0.0;
    const classn = getCurrencyClass(Currency);

    // let str =
    //   Currency && Currency.symbol
    //     ? `<span class="${classn}"> ${Currency.symbol}</span> ${val} (<span class="${classn}">${Currency.symbol_native}</span>)`
    //     : val;
    let str =
      Currency && Currency.symbol
        ? `${Currency.symbol} ${val} (${Currency.symbol_native})`
        : val;

    return { str, classn };
  };

  const getCurrencyClass = (currency) => {
    const arabic = [
      "AED",
      "MAD",
      "QAR",
      "YER",
      "ILS",
      "INR",
      "IQD",
      "JOD",
      "KWD",
      "LYD",
      "TND",
      "BHD",
      "DZD",
      "SDG",
      "SYP",
      "OMR",
      "AFN",
      "AMD",
      "DZD",
      "EGP",
    ];
    const arabic_d = ["AFN"];
    const bangla = ["BDT", "ETB"];
    const armenia = ["AMD"];
    const azerbaijan = ["AZN", "BGN", "GEL"];
    const combodia = ["KHR"];
    let classn = "latin";
    if (arabic.includes(currency.code)) {
      classn = "arabic";
    } else if (bangla.includes(currency.code)) {
      classn = "bangla";
    } else if (arabic_d.includes(currency.code)) {
      classn = "arabic_d";
    } else if (armenia.includes(currency.code)) {
      classn = "armenia";
    } else if (azerbaijan.includes(currency.code)) {
      classn = "azerbaijan";
    } else if (combodia.includes(currency.code)) {
      classn = "combodia";
    }
    return classn;
  };

  const getFontName = (classn) => {
    let font = "";
    switch (classn) {
      case "arabic":
        font = "DejaVuSans";
        break;
      case "arabic_d":
        font = "NotoNaskhArabicUIRegular";
        break;
      case "bangla":
        font = "FreeSerif";
        break;
      case "azerbaijan":
        font = "Roboto";
        break;
      case "latin":
        font = "";
        break;
      case "rupee":
        font = "";
        break;

      default:
        font = "";
        break;
    }
    return font;
  };

  const randomDarkColors = (params) => {
    return (
      Math.floor(Math.random() * 222 + 10).toString(16) +
      Math.floor(Math.random() * 222 + 10).toString(16) +
      Math.floor(Math.random() * 222 + 10).toString(16)
    );
  };

  const onFinish = async (vals) => {
    const { str, classn } = formatter(vals);
    //console.log(vals, val);
    setFormattedValue(str || "");
    /**Empty Document */

    const template = {
      schemas: [
        {
          currency: {
            type: "text",
            position: {
              x: 25.06,
              y: 6.35,
            },
            width: 150,
            height: 18.7,
            fontSize: 16,
            fontColor: "#" + randomDarkColors(),
            fontName: getFontName(classn),
          },
          currency1: {
            type: "text",
            position: {
              x: 25.06,
              y: 26.35,
            },
            width: 150,
            height: 18.7,
            fontSize: 16,
            fontColor: "#" + randomDarkColors(),
            fontName: "DejaVuSans",
          },
          currency2: {
            type: "text",
            position: {
              x: 25.06,
              y: 46.35,
            },
            width: 150,
            height: 18.7,
            fontSize: 16,
            fontColor: "#" + randomDarkColors(),
            fontName: "DubaiRegular",
          },
          currency3: {
            type: "text",
            position: {
              x: 25.06,
              y: 66.35,
            },
            width: 150,
            height: 18.7,
            fontSize: 16,
            fontColor: "#" + randomDarkColors(),
            fontName: "FreeSerif",
          },
          currency4: {
            type: "text",
            position: {
              x: 25.06,
              y: 86.35,
            },
            width: 150,
            height: 18.7,
            fontSize: 16,
            fontColor: "#" + randomDarkColors(),
            fontName: "OpenSansRegular",
          },
          currency5: {
            type: "text",
            position: {
              x: 25.06,
              y: 106.35,
            },
            width: 150,
            height: 18.7,
            fontSize: 16,
            fontColor: "#" + randomDarkColors(),
            fontName: "NotoNaskhArabicUIRegular",
          },
          currency6: {
            type: "text",
            position: {
              x: 25.06,
              y: 126.35,
            },
            width: 150,
            height: 18.7,
            fontSize: 16,
            fontColor: "#" + randomDarkColors(),
            fontName: "AliceRegular",
          },
          currency7: {
            type: "text",
            position: {
              x: 25.06,
              y: 146.35,
            },
            width: 150,
            height: 18.7,
            fontSize: 16,
            fontColor: "#" + randomDarkColors(),
            fontName: "RobotoRegular",
          },
        },
      ],
      basePdf: BLANK_PDF,
    };

    const inputs = [
      {
        currency: `${getFontName(classn)} value is :- ${str} .`,
        currency1: `"Dejavu" value is :- ${str} .`,
        currency2: `"Dubai" The entered value is :- ${str} .`,
        currency3: `"FreeSerif" The entered value is :- ${str} .`,
        currency4: `"OpenSansRegular" The entered value is :- ${str} .`,
        currency5: `"NotoNaskhArabicUIRegular" The entered value is :- ${str} .`,
        currency6: `"AliceRegular" value is :- ${str} .`,
        currency7: `"RobotoRegular" value is :- ${str} .`,
      },
    ];

    /**
     * COUNTRIES & FONTS
      ARmenia : Noto Sans Armenian
      Combodia : Noto Sans Khmer,
     */
    const font = {
      DejaVuSans: {
        data: await fetch(DejaVuSansFont).then((res) => res.arrayBuffer()),
        fallback: true,
      },
      DubaiRegular: {
        data: await fetch(DubaiRegularFont).then((res) => res.arrayBuffer()),
        //fallback: true,
      },
      FreeSerif: {
        data: await fetch(FreeSerifFont).then((res) => res.arrayBuffer()),
        //fallback: true,
      },
      OpenSansRegular: {
        data: await fetch(OpenSansRegularFont).then((res) => res.arrayBuffer()),
        //fallback: true,
      },
      NotoNaskhArabicUIRegular: {
        data: await fetch(NotoNaskhArabicUIRegularFont).then((res) =>
          res.arrayBuffer()
        ),
        //fallback: true,
      },
      AliceRegular: {
        data: await fetch(AliceRegularFont).then((res) => res.arrayBuffer()),
        //fallback: true,
      },
      RobotoRegular: {
        data: await fetch(RobotoRegularFont).then((res) => res.arrayBuffer()),
        //fallback: true,
      },
    };
    const pdf = await generate({ template, inputs, options: { font } });

    // Node.js
    // fs.writeFileSync(path.join(__dirname, 'test.pdf'), pdf);

    // Browser
    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));
  };

  const onCurrencySelect = (params) => {
    const vals = form.getFieldValue();
    //console.log(vals);
    const { str } = formatter(vals);
    setFormattedValue(str || "");
  };

  function base64convert(file) {
    console.clear();
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result);
    };
    reader.readAsDataURL(file);
    return reader;
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  const createPdf = async (params) => {
    //CurrencyList
    let file = await fetch(RobotoRegularFont).then((res) => res.blob());
    console.log(file);
    //const file = 'assets/fonts/Roboto-Regular.ttf';
    const font = await toBase64(file);
    console.log(font.split(','));
    const doc = new jsPDF();

    // define custom font
    doc.addFileToVFS(
      "RobotoRegular.ttf",
      font.split(',')[1]
      // ttf font file converted to base64
      // following is Consolas with only hex digit glyphs defined (0-9, A-F)
    ); // add custom font to file

    doc.addFont("RobotoRegular.ttf", "RobotoRegular", "normal");

//    autoTable(doc, { html: "#my-table" });

    // Or use javascript directly:
    let list = [];
    newCurrency.forEach((el) => {
      let ar = [el.code, el.name, el.value];
      list.push(ar);
    });
    doc.setFont("RobotoRegular");
    autoTable(doc, {
      theme: "grid",
      head: [["code", "Name", "Value"]],
      body: list,
      styles:{font:"RobotoRegular"}
      // didDrawCell: async (data) => {
      //   //console.log(data);
      //   if (
      //     data.section === "body"
      //     //&&
      //     //data.column.index === config.table.avatar.index
      //   ) {
      //     if (
      //       data.cell.raw !== "" &&
      //       data.cell.raw !== null &&
      //       data.cell.raw !== undefined
      //     ) {
      //       doc.addImage(
      //         data.cell.raw,
      //         "PNG",
      //         data.cell.x + 2,
      //         data.cell.y + 2,
      //         data.cell.width - 10,
      //         data.cell.height - 3
      //       );
      //     }
      //   }
      // },
    });
    // var y = 20;
    // doc.setLineWidth(2);
    // doc.text(200, y = y + 30, "TOTAL MARKS OF STUDENTS");
    // doc.autoTable({
    //     html: '#simple_table',
    //     startY: 70,
    //     theme: 'grid',
    //     columnStyles: {
    //         0: {
    //             cellWidth: 30,
    //         },
    //         1: {
    //             cellWidth: 30,
    //         },
    //         2: {
    //             cellWidth: 30,
    //         }
    //     },
    //     styles: {
    //         minCellHeight: 15
    //     }
    // })

    doc.output("dataurlnewwindow", { filename: "title" });
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
              onSelect={onCurrencySelect}
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
          <span
            style={{ fontWeight: "500" }}
            dangerouslySetInnerHTML={{ __html: FormattedValue }}
          />
        </div>
        <Button type="primary" onClick={createPdf}>
          Create PDF
        </Button>

        <Table
          //id="simple_table"
          dataSource={newCurrency}
          columns={[
            {
              dataIndex: "name",
              title: "Name",
            },
            {
              render: (data) => (
                <span dangerouslySetInnerHTML={{ __html: data.value }} />
              ),
              title: "Value",
            },
          ]}
          rowKey="code"
          pagination={false}
          scroll={{ y: 500 }}
        />
      </Card>
    </>
  );
};

export default CreatePdf;
