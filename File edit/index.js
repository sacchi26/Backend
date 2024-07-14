const fs = require("fs");
// const path = require("path");
const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];
function fileManager() {
    switch (operation) {
        case "read":
            fs.readFile(file, "utf-8", (err, data) => {
                console.log(data);
            });
            break;
        case "append":
            fs.appendFile(file, `\n${content}`, () => {
                console.log(`Content appended to the file ${file}`);
            });
            break;
        case "delete":
            fs.unlink(file, () => {
                console.log(`File ${file} deleted`);
            });
            break;
        case "create":
            fs.writeFile(file, `${content}`, () => {
                console.log(`File ${file} created`);
            });
            break;
        case "rename":
            fs.rename(file, `${content}`, () => {
                console.log(`File ${file} renamed to ${content}`);
            });
            break;
        case "list":
            fs.readdir(file, (err, files) => {
                console.log(
                    `all list of all ${files} and directories in the current directory`
                );
            });
            break;
        default:
            console.log(`Invalid operation '${operation}'`);
    }
}
fileManager();