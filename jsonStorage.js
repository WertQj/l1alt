// jsonStorage.js

const fs = require('fs');
class JsonStorage {

    // filePath - path to JSON file
    constructor(filePath) {
        this.filePath = filePath;
        //  throw new Error("Not implemented.");

    }

    get nextId() {
        return this.readItems().id;
    }

    incrementNextId() {
        const jsonArray = this.readItems();
        jsonArray.nextId = jsonArray.nextId + 1;
        this.writeItems(jsonArray);
        return jsonArray.nextId;
    }

    readItems() {
        const jsonText = fs.readFileSync(this.filePath);
        const jsonArray = JSON.parse(jsonText);
        return jsonArray;
    }

    writeItems(items) {
        console.log('items', items)
        fs.writeFileSync(
            this.filePath, 
            JSON.stringify(items, null, 4), 
            (err) => {
            if (err) throw err;
        });
    }
};

module.exports = JsonStorage;