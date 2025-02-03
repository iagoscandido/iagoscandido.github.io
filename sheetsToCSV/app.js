const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

// Configuration
const CONFIG = {
  columnMappings: {
    id: "id",
    title: "Ações",
    shortDesc: "Descrição rápida",
    longDesc: "Descrição Completa",
  },
  outputFile: "items.json",
};

async function convertSheetToJson(csvUrl) {
  try {
    // Download CSV data
    const response = await axios.get(csvUrl, { responseType: "stream" });

    // Process CSV data
    const results = [];
    await new Promise((resolve, reject) => {
      response.data
        .pipe(csv())
        .on("data", (data) => {
          // Map columns and clean data
          const item = {
            id: parseInt(data[CONFIG.columnMappings.id]) || Date.now(),
            title: data[CONFIG.columnMappings.title]?.trim() || "",
            shortDesc: data[CONFIG.columnMappings.shortDesc]?.trim() || "",
            longDesc: data[CONFIG.columnMappings.longDesc]?.trim() || "",
          };
          results.push(item);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    // Save to JSON file
    fs.writeFileSync(
      CONFIG.outputFile,
      JSON.stringify(results, null, 2),
      "utf-8"
    );

    console.log(
      `Successfully converted ${results.length} items to ${CONFIG.outputFile}`
    );
  } catch (error) {
    console.error("Conversion failed:", error.message);
    process.exit(1);
  }
}

// Run script
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: node google-sheet-to-json.js <CSV_URL>");
    console.log("Get CSV URL: File → Share → Publish to web → CSV → Copy link");
    process.exit(0);
  }
  convertSheetToJson(args[0]);
}
