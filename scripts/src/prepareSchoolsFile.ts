const fs = require("fs");
const path = require("path");

const PATH_TO_CSV: string = "/../../data/2025/registre_2025.csv";
const PATH_TO_JSON: string = "/../../public/schools.json";
const CSV_DELIMITER: string = ";";

const excludeFields: string[] = [];

async function main() {
  const filePath: string = path.join(__dirname, PATH_TO_CSV);
  // Read CSV
  const fileContent: string = fs.readFileSync(filePath, { encoding: "utf-8" });
  if (!fileContent) {
    throw new Error("File not found");
  }

  // Split on row and filter empty rows
  const rows: string[] = fileContent.split("\n").filter((row) => row.trim());

  // Get first row for column headers
  const headers: string[] = rows.shift()?.split(CSV_DELIMITER).map((header) => header.replace("\r", "")) || [];
  console.log(headers);

  const json: any[] = [];
  rows.forEach((row) => {
    // Split row and trim whitespace
    const columns = row.split(CSV_DELIMITER).map((col) => col.trim());

    // Create object mapping headers to values
    const rowObject = headers.reduce((obj: any, header, index) => {
      if (!excludeFields.includes(header)) {
        // Convert numeric strings to numbers
        const value = columns[index];
        obj[header] = /^\d+$/.test(value) ? Number(value) : value;
      }
      return obj;
    }, {});

    json.push(rowObject);
  });

  // // modify schema
  // const schools = json.map((school) => ({
  //   id: school.codigo,
  //   title: school.dgenerica,
  //   name: school.despecific,
  //   address: school.direccion,
  //   postalCode: school.codpostal,
  //   city: school.localidad,
  //   province: school.provincia,
  //   phone: school.telefono,
  //   fax: school.fax,
  // }))

  const outPath: string = path.join(__dirname, PATH_TO_JSON);
  // Write formatted JSON to file
  fs.writeFileSync(outPath, JSON.stringify(json, null, 2), "utf8");
}

main();