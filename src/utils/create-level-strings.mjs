import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const cases = {
  lowerCase: "1234567890-=[];'`,./",
  upperCase: '!@#$%^&*()_+{}:"|~<>?',
  mixedCase: "1234567890-=[];'`,./!@#$%^&*()_+{}:|~<>?",
  allChars:
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=[];'`,./!@#$%^&*()_+{}:|~<>?",
};

function createRandomString(caseType, length) {
  let randomString = "";
  const charCount = {};
  const loweredCaseCount = {};

  const isLetter = (char) => /[a-zA-Z]/.test(char);
  const isNumber = (char) => /[0-9]/.test(char);
  const protectNumberAndLetterLimit = (inputString, inputChar, length) => {
    const letterCount = (inputString.match(/[a-zA-Z]/g) || []).length;
    const numberCount = (inputString.match(/[0-9]/g) || []).length;
    if (
      letterCount + numberCount < length / 4 ||
      (!isLetter(inputChar) && !isNumber(inputChar))
    ) {
      return true;
    }
  };

  while (randomString.length < length) {
    const randomChar = caseType[Math.floor(Math.random() * caseType.length)];

    charCount[randomChar] = (charCount[randomChar] || 0) + 1;
    loweredCaseCount[randomChar.toLowerCase()] =
      (charCount[randomChar.toLowerCase()] || 0) + 1;

    if (
      charCount[randomChar] <= 2 &&
      loweredCaseCount[randomChar.toLowerCase()] <= 3 &&
      randomString[randomString.length - 1] !== randomChar &&
      protectNumberAndLetterLimit(randomString, randomChar, length)
    ) {
      randomString += randomChar;
    }
  }

  return randomString;
}

// console.log(createRandomString(all, 21));

function transformData(data, speed) {
  let lastLevel;

  const stringsAdded = data.map((level) => {
    if (!level.reverse) {
      const transformedLevel = {
        id: uuidv4(),
        reverse: level.reverse,
        speed: speed,
        length: level.length,
        case: level.case,
        string: createRandomString(cases[level.case], level.length),
      };

      lastLevel = transformedLevel;
      return transformedLevel;
    } else if (level.reverse) {
      return {
        id: uuidv4(),
        reverse: level.reverse,
        speed: speed,
        length: level.length,
        case: level.case,
        string: lastLevel.string.split("").reverse().join(""), // Access stored string
      };
    }
  });
  let index = 0
  return stringsAdded.map ((level)=>{
    index = ++index
    return {
      ...level,
      id: index,
    }

  })
}

const filePath = path.resolve("../data/levels-wpm.json");
const transformedFilePath = path.resolve("../data/levels-10wpm.json");

const processData = async () => {
  try {
    const rawData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(rawData);
    // console.log("data:", data)

    const transformedData = transformData(data, "10wpm");

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
