import { BLANK_PDF, generate } from "@pdfme/generator";
import { Button, Card, Form, Input, Select, Table } from "antd";
//import { CurrencyList } from "assets/data/currencies";
import { useEffect, useState } from "react";

import DejaVuSans from "assets/fonts/DejaVuSans.ttf";
import FreeSerif from "assets/fonts/FreeSerif.ttf";
import Roboto from "assets/fonts/Roboto-Regular.ttf";
import Mukta from "assets/fonts/Mukta-Regular.ttf";
import NotoSerifArmenian from "assets/fonts/NotoSerifArmenian-Regular.ttf";
import NotoSansSinhala from "assets/fonts/NotoSansSinhala-Regular.ttf";
import ZenAntique from "assets/fonts/ZenAntique-Regular.ttf";
import Overpass from "assets/fonts/Overpass-Regular.ttf";
import NotoSansKhmer from "assets/fonts/NotoSansKhmer-Regular.ttf";
import AbhayaLibre from "assets/fonts/AbhayaLibre-Regular.ttf";
import Base64Fonts from "assets/data/Base64Fonts.json";
import { CurrencyList } from "assets/data/AppCurrency";

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
  const [FontBase64, setFontBase64] = useState([]);
  const doc = new jsPDF();

  useEffect(() => {
    try {
      addFonts();
      //let fontArray = JSON.parse(Base64Fonts);
      setFontBase64(Base64Fonts);
      for (let i = 0; i < CurrencyList.length; i++) {
        let el = CurrencyList[i];
        let classn = getCurrencyClass(el);
        const fontName = getFontName(classn);
        let str =
          el && el.symbol ? `${el.symbol} ${500} ${el.symbol_native} ` : 500;
        el.value = str;
        //el.fontName = fontName || "";
        CurrencyList[i] = el;
        //arr.push(el);
      }

      setnewCurrency(CurrencyList);
      console.log(CurrencyList);
    } catch (err) {
      console.log(err);
    }
    //});
  }, []);

  const addFonts = async (params) => {
    try {
      // define custom font
      // ttf font file converted to base64
      // following is Consolas with only hex digit glyphs defined (0-9, A-F)
      // add custom font to file

      let file1 = await fetch(DejaVuSans).then((res) => res.blob());
      const font1 = await toBase64(file1);

      let file2 = await fetch(Roboto).then((res) => res.blob());
      const font2 = await toBase64(file2);

      let file3 = await fetch(FreeSerif).then((res) => res.blob());
      const font3 = await toBase64(file3);

      let file4 = await fetch(Mukta).then((res) => res.blob());
      const font4 = await toBase64(file4);

      let file5 = await fetch(NotoSerifArmenian).then((res) => res.blob());
      const font5 = await toBase64(file5);

      let file6 = await fetch(NotoSansKhmer).then((res) => res.blob());
      const font6 = await toBase64(file6);
      let file7 = await fetch(Overpass).then((res) => res.blob());
      const font7 = await toBase64(file7);
      let file8 = await fetch(ZenAntique).then((res) => res.blob());
      const font8 = await toBase64(file8);
      let file9 = await fetch(NotoSansSinhala).then((res) => res.blob());
      const font9 = await toBase64(file9);

      let fontArray = [
        {
          fontName: "DejaVuSans",
          base64: font1.split(",")[1],
          type: "normal",
        },
        {
          fontName: "Roboto",
          base64: font2.split(",")[1],
          type: "normal",
        },
        {
          fontName: "FreeSerif",
          base64: font3.split(",")[1],
          type: "normal",
        },
        {
          fontName: "Mukta",
          base64: font4.split(",")[1],
          type: "normal",
        },
        {
          fontName: "NotoSerifArmenian",
          base64: font5.split(",")[1],
          type: "normal",
        },
        {
          fontName: "NotoSansKhmer",
          base64: font6.split(",")[1],
          type: "normal",
        },
        {
          fontName: "Overpass",
          base64: font7.split(",")[1],
          type: "normal",
        },
        {
          fontName: "ZenAntique",
          base64: font8.split(",")[1],
          type: "normal",
        },
        {
          fontName: "NotoSansSinhala",
          base64: font9.split(",")[1],
          type: "normal",
        },
      ];
      setFontBase64(fontArray);
    } catch (err) {
      console.log(err);
    }
  };

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
    try {
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
        "DZD",
        "EGP",
        "LBP",
        "MRO",
        "SAR",
      ];
      const arabic_d = ["AFN"];
      const bangla = ["BDT", "ETB", "LKR"]; // "NPR"
      const armenia = ["AMD"];
      const azerbaijan = ["AZN", "BGN", "GEL", "TRY"];
      const combodia = ["KHR"];
      const japan = ["JPY"];
      const nepalese = ["NPR"];

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
      } else if (japan.includes(currency.code)) {
        classn = "japan";
      } else if (nepalese.includes(currency.code)) {
        classn = "nepalese";
      }
      return classn;
    } catch (err) {
      console.log(err);
    }
  };

  const getFontName = (classn) => {
    let font = "";
    switch (classn) {
      case "latin":
        font = "DejaVuSans";
        break;
      case "arabic":
        font = "DejaVuSans";
        break;
      case "arabic_d":
        font = "Overpass";
        break;
      case "bangla":
        font = "FreeSerif";
        break;
      case "azerbaijan":
        font = "Overpass";
        break;
      case "combodia":
        font = "Overpass";
        break;
      case "japan":
        font = "ZenAntique";
        break;
      case "armenia":
        font = "NotoSerifArmenian";
        break;
      case "nepalese":
        font = "Mukta";
        break;

      default:
        font = "DejaVuSans";
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

  const onCurrencySelect = (params) => {
    const vals = form.getFieldValue();
    const { str } = formatter(vals);
    setFormattedValue(str || "");
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const createPdf = async (params) => {
    try {
      //CurrencyList
      let file1 = await fetch(DejaVuSans).then((res) => res.blob());
      const font1 = await toBase64(file1);
      let file2 = await fetch(Roboto).then((res) => res.blob());
      const font2 = await toBase64(file2);
      let file3 = await fetch(FreeSerif).then((res) => res.blob());
      const font3 = await toBase64(file3);
      let file4 = await fetch(Mukta).then((res) => res.blob());
      const font4 = await toBase64(file4);

      let file5 = await fetch(NotoSerifArmenian).then((res) => res.blob());
      const font5 = await toBase64(file5);

      let file6 = await fetch(NotoSansKhmer).then((res) => res.blob());
      const font6 = await toBase64(file6);
      let file7 = await fetch(Overpass).then((res) => res.blob());
      const font7 = await toBase64(file7);
      let file8 = await fetch(ZenAntique).then((res) => res.blob());
      const font8 = await toBase64(file8);
      let file9 = await fetch(NotoSansSinhala).then((res) => res.blob());
      const font9 = await toBase64(file9);

      doc.addFileToVFS("DejaVuSans.ttf", font1.split(",")[1]);
      doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");

      // doc.addFileToVFS("Roboto.ttf", font2.split(",")[1]);
      // doc.addFont("Roboto.ttf", "Roboto", "normal");

      doc.addFileToVFS("FreeSerif.ttf", font3.split(",")[1]);
      doc.addFont("FreeSerif.ttf", "FreeSerif", "normal");

      doc.addFileToVFS("Mukta.ttf", font4.split(",")[1]);
      doc.addFont("Mukta.ttf", "Mukta", "normal");

      doc.addFileToVFS("NotoSerifArmenian.ttf", font5.split(",")[1]);
      doc.addFont("NotoSerifArmenian.ttf", "NotoSerifArmenian", "normal");

      doc.addFileToVFS("NotoSansKhmer.ttf", font6.split(",")[1]);
      doc.addFont("NotoSansKhmer.ttf", "NotoSansKhmer", "normal");

      doc.addFileToVFS("Overpass.ttf", font7.split(",")[1]);
      doc.addFont("Overpass.ttf", "Overpass", "normal");

      doc.addFileToVFS("ZenAntique.ttf", font8.split(",")[1]);
      doc.addFont("ZenAntique.ttf", "ZenAntique", "normal");
      doc.addFileToVFS("NotoSansSinhala.ttf", font9.split(",")[1]);
      doc.addFont("NotoSansSinhala.ttf", "NotoSansSinhala", "normal");

      // Or use javascript directly:
      // FontBase64.forEach((element) => {
      //   doc.addFileToVFS(element.fontName + ".ttf", element.base64);
      //   doc.addFont(element.fontName + ".ttf", element.fontName, element.type);
      //   console.log(element.fontName + ".ttf", element.fontName);
      // });
      let list = [];
      newCurrency.forEach((el) => {
        let ar = [el.code, el.name, el.value];
        list.push(ar);
      });
      //doc.setFont("Roboto");
      const indexOfColumn = 2;
      console.log(doc.getFontList());
      doc.setFont("NotoSansSinhala");
      doc.text("hi mama  රු", 15, 5);
      autoTable(doc, {
        theme: "grid",
        head: [["code", "Name", "Value"]],
        body: list,
        //styles: { font: "DejaVuSans" },
        didParseCell: async (data) => {
          if (data.section === "body" && data.column.index === indexOfColumn) {
            if (
              data.cell.raw !== "" &&
              data.cell.raw !== null &&
              data.cell.raw !== undefined
            ) {
              let Currency =
                data.row.raw && data.row.raw[0]
                  ? newCurrency.find((x) => x.code === data.row.raw[0])
                  : {};
              // const classn = getCurrencyClass(Currency);
              // const fontName = getFontName(classn);
              let text =
                Currency && Currency.symbol
                  ? `${Currency.symbol} ${500} ${Currency.symbol_native} ${
                      Currency.fontName
                    }`
                  : 500;
              data.cell.text = [text];
              //console.log(data.cell.text, Currency);
              data.cell.styles.font = Currency.fontName;
            }
          }
        },
      });

      doc.output("dataurlnewwindow", { filename: "title" });
    } catch (err) {
      console.log(err);
    }
  };

  const download = async (text, filename, type) => {
    var a = document.getElementById("a");
    let currencies = JSON.stringify(FontBase64);

    var file = new Blob([currencies], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = filename;
  };

  return (
    <>
      <Card>
        <a href="#" id="a">
          click here to download your file
        </a>
        <button
          onClick={download(
            "file text",
            "Base64Fonts.json",
            "text/plain;charset=utf-8"
          )}
        >
          Create file
        </button>

        <Form {...layout} form={form} name="control-hooks">
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
