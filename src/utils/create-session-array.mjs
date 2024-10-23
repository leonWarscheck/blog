import fs from "fs/promises";

// Function to generate a random three-digit number
function getRandomThreeDigitNumber() {
    return Math.floor(Math.random() * 90) + 10; // Generates a number between 100 and 999
}

// Create an array with 500 random three-digit numbers
const randomNumbers = [];
for (let i = 0; i < 500; i++) {
    randomNumbers.push(getRandomThreeDigitNumber());
}

// Convert the array to a JSON string
const jsonString = JSON.stringify(randomNumbers, null, 2); // `null, 2` for pretty-printing

// Save the JSON string to a file
fs.writeFile('../data/randomNumbers.json', jsonString, (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File saved successfully!');
    }
});
