import fs from 'node:fs';

function readJsonFile() {
    const rawData = fs.readFileSync('./data.json', 'utf8');
    const jsonData = JSON.parse(rawData);
    console.log(jsonData);
}

function addJsonFile(newDescription) {
    const rawData = fs.readFileSync('./data.json', 'utf8');
    const jsonData = JSON.parse(rawData);

    jsonData.description = newDescription;

    const updateRawData = JSON.stringify(jsonData, null, 2);

    fs.writeFileSync('./data.json', updateRawData, 'utf8');

    console.log("Updated Successfully:", jsonData);
}

addJsonFile("This is a new Description");
readJsonFile();
