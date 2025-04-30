const fs = require("fs");
const path = require("path");
const jsonminify = require("jsonminify");

const PATH_TO_CSV: string = "/../../data/legacy/times.csv";
const PATH_TO_JSON: string = "/../../public/times.json";

const excludeFields = ["the_geom", "cartodb_id", "created_at", "updated_at"];


type TimesData = {
  [postalCode: number]: string[];
}

function secToMin ( secs: number): number {
  return Math.ceil(secs / 60);
}

function metersToKm ( meters: number): number {
  return Math.ceil(meters / 1000);
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

  const listCP2 = listCp.slice(0, 10);

  let insertedAllCps: number[] = [];
  for (const cp of listCp) {
    if (insertedAllCps.includes(cp)) {
      continue;
    }
    let insertedCps: number[] = [];
    let result: string[] = [];
    // from
    const othersCpFrom = rawJson.filter((item) => item.cp_from === cp);

    for (const otherCp of othersCpFrom) {
      if (insertedCps.includes(otherCp.cp_to)) {
        continue;
      }
      result.push(`${otherCp.cp_to},${metersToKm(otherCp.from_dist)},${secToMin(otherCp.from_time)}`);
      insertedCps.push(otherCp.cp_from);
    }

    // to
    // const othersCpTo = rawJson.filter((item) => item.cp_to === cp);
    // for (const otherCp of othersCpTo) {
    //   if (insertedCps.includes(otherCp.cp_from)) {
    //     continue;
    //   }
    //   result.push(`${otherCp.cp_from},${metersToKm(otherCp.to_dist)},${secToMin(otherCp.to_time)}`);
    //   insertedCps.push(otherCp.cp_to);
    // }
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
