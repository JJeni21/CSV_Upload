
import './App.css';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@mui/material/Button';
import { Card, Typography } from '@mui/material';
import image from '../src/scenary.jpg';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


function App() {

  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    // Check if the uploaded file is an Excel file.
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setSelectedFile(file);
        let fileReader=new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload=(e)=>
        {
          let data=e.target.result;
          let workbook=XLSX.read(data,{type:"binary"});
          workbook.SheetNames.forEach(sheet=>{
            let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
            console.log(rowObject)
          })
        }
     
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Please upload a valid Excel file (xls or xlsx)',
        })
        
      }
    }
  };
  const dropzoneStyles = {


    textAlign: 'center',
    cursor: 'pointer',
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xls, .xlsx',
    multiple: false,
  });

  return (
    <div style={{ backgroundImage: `url(${image})`, height: "743px", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <div {...getRootProps()} style={{ dropzoneStyles, padding: "40px" }}>
        <input {...getInputProps()} />
        <Card style={{ height: "600px", display: "flex", flexDirection: "column", padding: "20px", background: `rgba(255,255,255,0.3)` }}>
          <Typography style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center", margin: "30px" }}>Upload CSV File</Typography>
          <div style={{ display: "flex", justifyContent: "space-between", width: "420px", alignItems: "center" }}>
            <Button variant="contained" color="primary" component="span" style={{ height: "40px", width: "200px" }}>
              Upload Excel File
            </Button>
            {selectedFile && (
              <div>
                <p>Selected Excel file: {selectedFile.name}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

    </div>
  );
}



export default App;
