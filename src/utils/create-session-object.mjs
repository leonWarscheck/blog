import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";





function transformData(data) {
  console.log("data:", data)

 return data.map((level) => {
    return ({
        id: level.id,
        latestWpm: "984",
      });

    }
    );
}

const filePath = path.resolve("../data/levels-10wpm.json");
const transformedFilePath = path.resolve("../data/session-object.json");

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
