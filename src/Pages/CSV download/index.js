// import { CSVLink, CSVDownload } from "react-csv";

// const csvData = [
//   ["firstname", "lastname", "email"],
//   ["Ahmed", "Tomi", "ah@smthing.co.com"],
//   ["Raed", "Labes", "rl@smthing.co.com"],
//   ["Yezzi", "Min l3b", "ymin@cocococo.com"],
// ];
// function CsvDownload() {
//   // or
//   /* <CSVDownload data={csvData} target="_blank" />; */
//   return (
//     <>
//       <CSVLink data={csvData}>Download me</CSVLink>
//     </>
//   );
// }

// export default CsvDownload;

import React from "react";
import bootstrap from 'bootstrap'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const Header = () => {
  return (
    <div className="header">
      <h1>React Export To Excel Example</h1>
    </div>
  );
};

const Customers = ({ customers }) => {
  const CustomerRow = (customer, index) => {
    return (
      <tr key={index} className="even">
        <td> {index + 1} </td>
        <td>{customer.firstName}</td>
        <td>{customer.lastName}</td>
        <td>{customer.email}</td>
        <td>{customer.address}</td>
        <td>{customer.zipcode}</td>
      </tr>
    );
  };

  const CustomerTable = customers.map((cust, index) =>
    CustomerRow(cust, index)
  );

  const tableHeader = (
    <thead className="bgvi">
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Zipcode</th>
      </tr>
    </thead>
  );

  return (
    <Table striped bordered hover>
      {tableHeader}
      <tbody>{CustomerTable}</tbody>
    </Table>
  );
};

function CsvDownload() {
  const customers = () => {
    let custs = [];
    for (let i = 0; i <= 25; i++) {
      custs.push({
        firstName: `first${i}`,
        lastName: `last${i}`,
        email: `abc${i}@gmail.com`,
        address: `000${i} street city, ST`,
        zipcode: `0000${i}`,
      });
    }
    return custs;
  };

  const ExportCSV = ({ csvData, fileName }) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    console.log(csvData, fileName);
    const exportToCSV = (csvData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
      <Button variant="warning" onClick={(e) => exportToCSV(csvData, fileName)}>
        Export
      </Button>
    );
  };

  return (
    <>
      <div className="App">
        <Header />
        <div className="row">
          <div className="col-md-8">
            <h2>Customers</h2>
          </div>
          <div className="col-md-4 center">
            <ExportCSV
              csvData={customers()}
              fileName={'hi'}
            />
          </div>
        </div>
        <Customers customers={customers()} />
      </div>
    </>
  );
}

export default CsvDownload;
