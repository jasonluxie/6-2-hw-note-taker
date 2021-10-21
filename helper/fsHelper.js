const fs = require("fs");
const util = require("util");


const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err
            ? console.error(err)
            : console.info(`\nData written to ${destination}`)
    );
const readAndAppend = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};
// const readAndDelete = (content, file, noteID) => {
//     fs.readFile("./db/db.json", "utf8", (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             const parseData = JSON.parse(data);
//             const newParseData = parseData.filter((e) => e.id != noteID);
//             fs.writeFile(
//                 "./db/db.json",
//                 JSON.stringify(newParseData, null, 4),
//                 (err, result) => {
//                     if (err) console.error(err);
//                 }
//             );
//         }
//     });
// };
module.exports = { readFromFile, writeToFile, readAndAppend};
