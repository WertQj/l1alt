const PlanetRepository = require('./repositories/planetsRepository');
const Planet = require('./models/planets');
const readlineSync = require('readline-sync');
const UserRepository = require('./repositories/usersRepository');
const userRepo = new UserRepository('./data/users.json');
const planetRepo = new PlanetRepository('./data/planets.json');

function checkIfNumber(id) {
    if (!isNaN(id)) {
        return 0;
    }
    return 1;
}

class topBreak {
    constructor(logs) {
        this.logs = logs;
        console.log("****************************");
        console.log(logs);
    }
}

class sandwich {
    constructor(logs) {
        this.logs = logs;
        console.log("****************************");
        console.log(logs);
        console.log("****************************");
    }
}

function Get_users() {
    const Users = userRepo.getUsers();
    console.log("All users:");
    Users.forEach(item => {
        topBreak("id: " + item.id + "\nlogin: " + item.login + "\nfullname: " + item.fullname);
    });
    console.log("****************************");
}

function Get_user(input) {
    if (checkIfNumber(input.substr(input.lastIndexOf('/') + 1)) == 0) {
        const User = userRepo.getUserById(parseInt(input.substr(input.lastIndexOf('/') + 1)));
        console.log("User:");
        if (User == null) {
            console.log("User with this id doesn't exist");
        }
        else {
            sandwich("id: " + User.id + "\nlogin: " + User.login + "\nfullname: " + User.fullname);
        }
    }
    else {
        console.log("Something wrong with id");
    }

}

function Get_Planets() {
    const Planets = planetRepo.getPlanet();
    console.log("Planet list:");
    Planets.forEach(item => {
        sandwich("id: " + item.id + "\nsat: " + item.sat + "\nname: " + item.name +"\ndiscoverer:" +item.discoverer + "\nmass:" + item.mass);
    });
}

function Get_Planet(input) {
    if (checkIfNumber(input.substr(input.lastIndexOf('/') + 1)) == 0) {
        const Planet = planetRepo.getPlanetById(parseInt(input.substr(input.lastIndexOf('/') + 1)));
        console.log("Planet:");
        if (Planet == null) {
            console.log("Planet with this id doesn't exist");
        }
        else {
            sandwich("id: " + Planet.id + "\namong of sat's: " + Planet.sat + "\nname: " + Planet.name + "\ndiscoverer:" + Planet.discoverer + + "\nmass:" + Planet.mass);
        }
    }
    else {
        console.log("Something wrong with id");
    }

}

function Delete_Planet(input) {
    try {
        if (checkIfNumber(input.substr(input.lastIndexOf('/') + 1)) == 0) {
            planetRepo.deletePlanet(parseInt(input.substr(input.lastIndexOf('/') + 1)));
            console.log("Planet was deleted");
        }
        else {
            console.log("Something wrong with id");
        }
    }
    catch (err) {
        console.error(err);
    }
}

function Update_Planet(input) {
    if (checkIfNumber(input.substr(input.lastIndexOf('/') + 1)) == 0) {
        const Planet = planetRepo.getPlanetById(parseInt(input.substr(input.lastIndexOf('/') + 1)));
        if (Planet == null) {
            console.log("Planet with this id doesn't exist");
        }
        else {
            Planet.sat = readlineSync.question('Numbers of sats was: ' + Planet.sat + '\nEnter new number: ').trim;
            Planet.name = readlineSync.question('Old name: ' + Planet.name + '\nEnter new planet name: ').trim;
            Planet.discoverer = readlineSync.question('Old name of discoverer: ' + Planet.discoverer + '\nEnter new planet discoverer: ').trim;
            Planet.mass = readlineSync.question('Old mass is: ' + Planet.mass + '\nEnter new planet mas: ').trim;
            if (checkIfNumber(mass) == 0) {
                if (parseInt(mass) > 0) {
                    Planet.mass = parseInt(mass);
                }
                else {
                    console.log("It's impossible\nPlanet wasn`t updated");
                    return 1;
                }
            }

        }
            let time = new Date();
            Planet.timeDownload = time.toISOString();
            planetRepo.updatePlanet(Planet);
            console.log("Planet was updated");
    }
    else {
        console.log("Something wrong with id");
    }
}

function Add_Planet() {
    const sat = readlineSync.question('Enter number of sats: ').trim;
    const name = readlineSync.question('Enter planet name: ').trim;
    const discoverer = readlineSync.question('Enter planet discoverer: ').trim;
    const mass = readlineSync.question('Enter planet mass: ').trim;
    if (checkIfNumber(mass) == 0) {
        if (parseInt(mass) > 0) {
            Planet.mass = parseInt(mass);
        }
        else {
            console.log("It's impossible\nPlanet wasn`t updated");
            return 1;
        }
    }
    let time = new Date();
    const id = 0;
    const planet = new Planet(id, sat, name, time.toISOString(), discoverer, mass);
    const id_of_planet = planetRepo.addPlanet(planet);
    console.log("Planet was added with id: " + id_of_planet);
}

function get_help(){
    const command_list = console.log("get/{entities} to access list of all enteties \nget/users to get list of users \n");
    return command_list
}

function Menu(input) {
    if (input === 'get/users') {
        Get_users();
    }

    else if (input.includes('get/users/')) {
        Get_user(input);
    }

    else if (input === 'get/planet') {
        Get_Planets();
    }

    else if (input.includes('get/planet/')) {
        Get_Planet(input);
    }

    else if (input.includes('delete/planet/')) {
        Delete_Planet(input);
    }

    else if (input.includes('update/planet/')) {
        Update_Planet(input);
    }

    else if (input === 'add/planet') {
        Add_Planet();
    }

    else if (input === 'help') {
        get_help();
    }

    else {
        console.log("Wrong command");
    }
}

while (true) {
    try {
        const input = readlineSync.question('Enter your command or type \'help\' for list of commands. Press <Enter> to leave: ').trim();
        if (input.length === 0) break;
        Menu(input);
    }
    catch (err) {
        console.log("Something went wrong");
    }
}

console.log('Bye.');