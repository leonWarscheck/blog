import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";


function getRandomWpm() {
  return Math.floor(Math.random() * 30);
}


function transformData(data) {
  console.log("data:", data)

 return data.map((level) => {
    return ({
        id: level.id,
        wpm: "00",
      });

    }
    );
}

const filePath = path.resolve("../data/levels.json");
const transformedFilePath = path.resolve("../data/scores.json");

const processData = async () => {
  try {
    const rawData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(rawData);
   console.log("data:", !!data) 

    const transformedData = transformData(data);

    await fs.writeFile(
      transformedFilePath,
      JSON.stringify(transformedData, null, 2)
    );

    console.log("Data transformation complete. Transformed data saved.");
  } catch (error) {
    console.error("Error processing data:", error);
  }
};

processData();
