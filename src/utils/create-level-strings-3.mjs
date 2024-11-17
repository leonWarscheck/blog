import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const cases = {
  numbers: "1234567890",
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
  const caseString = cases[caseType];

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

  const noRepeatsLastStingMax5 = (randomChar) => {
    if (length <= 5) {
      return !lastString.includes(randomChar);
    } else {
      return true;
    }
  };

  while (randomString.length < length) {
    const randomChar =
      caseString[Math.floor(Math.random() * caseString.length)];
    // console.log("randomCharTry:", randomChar);
    charCount[randomChar] = (charCount[randomChar] || 0) + 1;
    loweredCaseCount[randomChar.toLowerCase()] =
      (charCount[randomChar.toLowerCase()] || 0) + 1;

    if (caseType === "numbers") {
      if (
        charCount[randomChar] <= 2 && // max ocurrence of same char is 2
        randomString[randomString.length - 1] !== randomChar && // no consecutive occurence of same character
        noRepeatsLastStingMax5(randomChar) // in strings of length 7: no character appears in consecutive strings
      ) {
        console.log("randomNum:", randomChar);
        randomString += randomChar;
      }
    } else {
      if (
        charCount[randomChar] <= 2 && // max ocurrence of same char is 2
        loweredCaseCount[randomChar.toLowerCase()] <= 3 && // max occurence of same char in any case is 3
        randomString[randomString.length - 1] !== randomChar && // no consecutive occurence of same character
        protectNumberAndLetterLimit(randomString, randomChar, length) && // maximum a quarter of chars can be letter or number
        noRepeatsLastStingMax5(randomChar) // in strings of length 7: no character appears in consecutive strings
      ) {
        console.log("randomChar:", randomChar);
        randomString += randomChar;
      }
    }
  }

  return randomString;
}

// console.log(createRandomString(all, 21));

function transformData(data) {
  // create base levelStrings
  let lastLevel;
  const stringsAdded = data.map((level, index) => {
    if (!level.reverse) {
      const transformedLevel = {
        reverse: level.reverse,
        length: level.length,
        case: level.case,
        string: createRandomString(level.case, level.length, lastLevel),
      };
      console.log("transforming data");

      lastLevel = transformedLevel;
      return transformedLevel;
    } else if (level.reverse) {
      return {
        reverse: level.reverse,
        length: level.length,
        case: level.case,
        string: lastLevel.string.split("").reverse().join(""), // Access stored string
      };
    }
  });

  // create sublevels from baseString
  const sublevels = [];

  stringsAdded.forEach((level) => {
    sublevels.push(
      {
        reverse: level.reverse,
        length: "5",
        case: level.case,
        string: level.string.slice(0, 5),
      },
      {
        reverse: level.reverse,
        length: "5",
        case: level.case,
        string: level.string.slice(5, 10),
      },
      {
        reverse: level.reverse,
        length: "5",
        case: level.case,
        string: level.string.slice(10, 15),
      },
      {
        reverse: level.reverse,
        length: "10",
        case: level.case,
        string: level.string.slice(0, 10),
      },
      {
        reverse: level.reverse,
        length: "15",
        case: level.case,
        string: level.string,
      }
    );
  });

  //index levelIds for all (sub)levels
  const sublevelsWithId = sublevels.map((level, index) => {
    return {
      id: index,
      ...level,
    };
  });

  return sublevelsWithId;
}

const filePath = path.resolve("../data/levels-template-3.json");
const transformedFilePath = path.resolve("../data/levels-3.json");

const processData = async () => {
  try {
    const rawData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(rawData);
    console.log("data:", !!data);

    const transformedData = transformData(data);
    console.log("transformedData:", !!transformedData);
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
