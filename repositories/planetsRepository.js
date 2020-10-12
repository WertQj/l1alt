const Planet = require('../models/planets');
const JsonStorage = require('../jsonStorage');

const fs = require('fs');
class PlanetRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
        this.filePath = filePath;
    }
    addPlanet(planet) {
        this.storage.writeItems(planet);
        return this.storage.nextId - 1;
    }

    getPlanet() {
        const items = this.storage.readItems().items;
        return items;
    }

    getPlanetById(id) {
        const items = this.storage.readItems().items;
        let planet = null;
        items.forEach(item => {
            if (item.id === id) {
                planet = new Planet(item.id, item.sat , item.name, item.timeDownload, item.discoverer, item.mass);
            }
        });
        return planet;
    }

    updatePlanet(planet) {
        const planetArray = this.storage.readItems();
        let exist = false;
        planetArray.items.forEach(element => {
            if (element.id == planet.id) {
                exist = true;
            }
        });
        if (exist) {
            planetArray.items[planetArray.items.findIndex(item => item.id === planet.id)] = planet;
            fs.writeFileSync(this.filePath, JSON.stringify(planetArray, null, 4), (err) => {
                if (err) throw err;
            });
        }
        else {
            throw 'Not found element with such id';
        }
    }
    deletePlanet(planet_id) {
        const planetArray = this.storage.readItems();
        let exist = false;
        planetArray.items.forEach(element => {
            if (element.id == planet_id) {
                exist = true;
            }
        });
        if (exist) {
            planetArray.items = planetArray.items.filter(item => item.id !== planetArray);
            fs.writeFileSync(this.filePath, JSON.stringify(planetArray, null, 4), (err) => {
                if (err) throw err;
            });
        }
        else {
            throw 'Not found element with such id';
        }
    }
};

module.exports = PlanetRepository;