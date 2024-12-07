import fs from "fs/promises";
import path from "path";

const transformData = (data) => {
  console.log(data)
  const newDataShape = {};
  data.map((level) => {
    if (level.wpm != 0) {
      newDataShape[level.id] = level.wpm;
    }
  });
  return newDataShape;
};

const processData = async () => {
  const inputFilePath = path.resolve(
    "../../../../../Downloads/symbol-trainer-scores (35).json"
  );
  const outputFilePath = path.resolve(
    "../../../../../Downloads/symbol-trainer-highScores (30).json"
  );
  try {
    const data = JSON.parse(await fs.readFile(inputFilePath, "utf8"));

    const newData = transformData(data);

    await fs.writeFile(outputFilePath, JSON.stringify(newData, null, 2));

    console.log("Data transformation complete. Transformed data saved.");
  } catch (error) {
    console.error("Error processing data:", error);
  }
};

processData();
