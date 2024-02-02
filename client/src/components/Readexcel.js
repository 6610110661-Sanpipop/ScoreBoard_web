import React, { useState } from 'react'
import * as XLSX from "xlsx"

function Readexcel(props) {
  const [data, setData] = useState([])

  const handleFileUpdate = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = XLSX.utils.sheet_to_json(sheet)
      setData(parsedData)
      const arr = parsedData.map((item) => Object.values(item))
      console.log('arr',arr)
      props.onAddscore(arr)
      // console.log('check',parsedData);  // เพิ่มบรรทัดนี้เพื่อดูข้อมูลที่ถูก console.log
    }
  }

  return (
    <div>
      <input
        type="file"
        accept='.xlsx, .xls'
        onChange={handleFileUpdate}
      />
    </div>
  )
}

export default Readexcel;
