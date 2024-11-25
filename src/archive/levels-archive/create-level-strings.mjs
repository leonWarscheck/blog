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

function createRandomString(caseType, length, lastLevel) {
  let randomString = "";
  const charCount = {};
  const loweredCaseCount = {};
  const lastString = lastLevel ? lastLevel.string : "";

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

  const noRepeatsLastStingMax7 = (randomChar) => {
    if (length <= 7) {
      return !lastString.includes(randomChar);
    } else {
      return true;
    }
  };


  while (randomString.length < length) {
    const randomChar = caseType[Math.floor(Math.random() * caseType.length)];
    console.log("randomCharTry:", randomChar);
    charCount[randomChar] = (charCount[randomChar] || 0) + 1;
    loweredCaseCount[randomChar.toLowerCase()] =
      (charCount[randomChar.toLowerCase()] || 0) + 1;

    if (
      charCount[randomChar] <= 2 && // max ocurrence of same char is 2
      loweredCaseCount[randomChar.toLowerCase()] <= 3 && // max occurence of same char in any case is 3
      randomString[randomString.length - 1] !== randomChar && // no consecutive occurence of same character
      protectNumberAndLetterLimit(randomString, randomChar, length) && // maximum a quarter of chars can be letter or number
      noRepeatsLastStingMax7(randomChar) // in strings of length 7: no character appears in consecutive strings
    ) {
      console.log("randomstring added")
      randomString += randomChar;
    }
  }

  return randomString;
}

// console.log(createRandomString(all, 21));

function transformData(data) {
  let lastLevel;

  const stringsAdded = data.map((level, index) => {
    if (!level.reverse) {
      const transformedLevel = {
        id: index,
        reverse: level.reverse,
        length: level.length,
        case: level.case,
        string: createRandomString(cases[level.case], level.length, lastLevel),
      };

      lastLevel = transformedLevel;
      return transformedLevel;
    } else if (level.reverse) {
      return {
        id: index,
        reverse: level.reverse,
        length: level.length,
        case: level.case,
        string: lastLevel.string.split("").reverse().join(""), // Access stored string
      };
    }
  });
  let index = 0;
  return stringsAdded.map((level) => {
    index = ++index;
    return {
      ...level,
      id: index,
    };
  });
}

const filePath = path.resolve("../data/levels-template.json");
const transformedFilePath = path.resolve("../data/levels.json");

const processData = async () => {
  try {
    const rawData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(rawData);
    // console.log("data:", data)

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
