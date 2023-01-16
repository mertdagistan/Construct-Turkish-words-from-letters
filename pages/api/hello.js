import path from "path";
const fs = require("fs");
const readline = require("readline");

export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), "data");
  console.log("jsonDirectory", jsonDirectory);
  //Read the json data file data.json
  const fileStream = await fs.createReadStream(
    jsonDirectory + "/kelimeler.txt",
    "utf8"
  );
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  var result = [];

  for await (const line of rl) {
    result.push(line);
  }

  res.status(200).json({ data: result });
}
