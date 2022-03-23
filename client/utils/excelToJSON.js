import * as XLSX from 'xlsx'


export default async function  excel_to_json(excel_data){
    const promise = new Promise((resolve, reject)=>{
        let reader = new FileReader();
        reader.readAsArrayBuffer(excel_data);
        let excel_array_buffer = null;
         reader.onload=(e)=>{
              excel_array_buffer = e.target.result;
              if(excel_array_buffer!=null){
                  const excelbook = XLSX.read(excel_array_buffer, {type:'buffer'});
                  const excelsheetName = excelbook.SheetNames[0];
                  const excelsheet = excelbook.Sheets[excelsheetName];
                  const json_data = XLSX.utils.sheet_to_json(excelsheet);
                //   console.log(json_data);
                  resolve(json_data);
              }else{
                  return null;
              }
            }   
    })
    return promise
}

