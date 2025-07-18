import XLSX from "xlsx"

export async function readXLSX(xlsFile: globalThis.File){
    const buffer = Buffer.from((await xlsFile.arrayBuffer()))
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

    return jsonData
}