const fs = require("fs");
const path = require("path");

const PATH_TO_CSV: string = "/../../data/2025/travel_times.csv";
const PATH_TO_JSON: string = "/../../src/assets/data/times.json";

const excludeFields = ["the_geom", "cartodb_id", "created_at", "updated_at"];


type TimesData = {
  [postalCode: number]: string[];
}

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
  const headers: string[] = rows.shift()?.split(",").map((header) => header.replace("\r", "")) || [];

  // raw data 
  const rawJson: any[] = [];
  rows.forEach((row) => {
    // Split row and trim whitespace
    const columns = row.split(",").map((col) => col.trim());

    // Create object mapping headers to values
    const rowObject = headers.reduce((obj: any, header, index) => {
      if (!excludeFields.includes(header)) {
        // Convert numeric strings to numbers
        const value = columns[index];
        obj[header] = /^\d+$/.test(value) ? Number(value) : value;
      }
      return obj;
    }, {});

    rawJson.push(rowObject);
  });

  // prepare data
  const json: TimesData = {};
  const listCpFrom: number[] = Array.from(new Set(rawJson.map((item) => item.cp_from)));
  const listCpTo: number[] = Array.from(new Set(rawJson.map((item) => item.cp_to)));
  const listCp: number[] = Array.from(new Set([...listCpFrom, ...listCpTo]));
  listCp.sort((a, b) => a - b);

  // duplicate data
  const preparedData: any[] = [];
  for (const item of rawJson) {
    preparedData.push({
      cp_from: item.cp_from,
      cp_to: item.cp_to,
      dist: item.from_dist,
      time: item.from_time,
    });
    preparedData.push({
      cp_from: item.cp_to,
      cp_to: item.cp_from,
      dist: item.to_dist,
      time: item.to_time,
    });
  }

 
  const insertedAllCps: number[] = [];
  for (const cp of listCp) {
    if (insertedAllCps.includes(cp)) {
      continue;
    }
    let insertedCps: number[] = [];
    const result: string[] = [];
    // from
    const othersCpFrom = preparedData.filter((item) => item.cp_from === cp);

    console.log(`-- ${cp} --`, othersCpFrom);

    for (const otherCp of othersCpFrom) {
      if (insertedCps.includes(otherCp.cp_to)) {
        continue;
      }
      result.push(`${otherCp.cp_to},${otherCp.dist},${otherCp.time}`);
      insertedCps.push(otherCp.cp_from);
    }


    // add to json
    json[cp] = result;
    insertedAllCps.push(cp);
    console.log(`inserted ${cp} with ${insertedAllCps.length}`);
    insertedCps = [];
  };

  const outPath: string = path.join(__dirname, PATH_TO_JSON);
  // Write formatted JSON to file
  fs.writeFileSync(outPath, JSON.stringify(json), "utf8");
}

main();
