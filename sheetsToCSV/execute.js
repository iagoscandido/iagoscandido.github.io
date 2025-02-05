const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

// Configuration
const CONFIG = {
  columnMappings: {
    title: "nome",
    transTitle: "traduzido",
    tag: "Tag",
    shortDesc: "short description",
    fullDesc: "full description",
  },
  outputFile: "items.json",
};

function convertCsvToJson(csvPath) {
  const results = [];
  let rowIndex = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (data) => {
        rowIndex++;
        const item = {
          title: data[CONFIG.columnMappings.title]?.trim() || "",
          transTitle: data[CONFIG.columnMappings.transTitle]?.trim() || "",
          tag:
            data[CONFIG.columnMappings.tag]?.trim() || "Propriedade das Armas",
          shortDesc: data[CONFIG.columnMappings.shortDesc]?.trim() || "",
          fullDesc: data[CONFIG.columnMappings.fullDesc]?.trim() || "",
        };

        // Convert ID to number if exists in CSV
        if (data[CONFIG.columnMappings.id]) {
          item.id = parseInt(item.id);
        }

        results.push(item);
      })
      .on("end", () => {
        fs.writeFileSync(
          CONFIG.outputFile,
          JSON.stringify(results, null, 2),
          "utf-8"
        );
        console.log(
          `Successfully converted ${results.length} items to ${CONFIG.outputFile}`
        );
        console.log("Sample item:", results[0]);
        resolve();
      })
      .on("error", reject);
  });
}

// Run script
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: node google-sheet-to-json.js <PATH_TO_CSV>");
    console.log("Example: node google-sheet-to-json.js data/input.csv");
    process.exit(0);
  }

  const csvPath = path.resolve(args[0]);

  if (!fs.existsSync(csvPath)) {
    console.error(`Error: File not found at ${csvPath}`);
    process.exit(1);
  }

  convertCsvToJson(csvPath).catch((error) => {
    console.error("Conversion failed:", error.message);
    process.exit(1);
  });
}
