import "./App.css";
import { useState } from "react";
import { Card, Typography } from "@mui/material";
import image from "../src/scenary.jpg";
import Swal from "sweetalert2";
import * as xlsx from "xlsx";

function App() {
  const [excelData, setExcelData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const readExcel = async (e) => {
    const file = e.target.files[0];
    if (
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setSelectedFile(file);

      const data = await file.arrayBuffer(file);
      const excelfile = xlsx.read(data);
      const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
      const exceljson = xlsx.utils.sheet_to_json(excelsheet);
      console.log(exceljson);
    } else {
      Swal.fire({
        icon: "error",
        title: "Please upload a valid Excel file (xls or xlsx)",
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ padding: "40px" }}>
        <Card
          style={{
            height: "200%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            background: `rgba(255,255,255,0.3)`,
          }}
        >
          <Typography
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              margin: "30px",
            }}
          >
            Upload CSV File
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "420px",
              alignItems: "center",
            }}
          >
            <input
            
              type="file"
              onChange={(e) => readExcel(e)}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
