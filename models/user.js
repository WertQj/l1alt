
class User {

    constructor(id, login, fullname, role, registeredAt, avaUrl, isEnabled) {
        this.id = id;  
        this.login = login;  
        this.fullname = fullname; 
        this.role = role; 
        this.registeredAt = registeredAt; 
        this.avaUrl = avaUrl; 
        this.isEnabled = isEnabled; 
    }
};

module.exports = User;