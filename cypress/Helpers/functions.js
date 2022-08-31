export const funcs = {
    randomUsername() {
        let uuid = require('uuid')
        let uid = uuid.v4()
        let uniqueId = uid.slice(1, 8);
        const userName = 'testUser_' + uniqueId;
        return userName
    },

    randomFirstName() {
        let uuid = require('uuid')
        let uid = uuid.v4()
        let uniqueId = uid.slice(1, 8);
        const firstName = 'testFirst_' + uniqueId;
        return firstName
    },

    randomLastName() {
        let uuid = require('uuid')
        let uid = uuid.v4()
        let uniqueId = uid.slice(1, 8);
        const lastName = 'testLast_' + uniqueId;
        return lastName;
    },

    userA() {
        const userName = 'userA'
        return userName
    },

    userB() {
        const userName = 'userB'
        return userName
    },

    userC() {
        const userName = 'userC'
        return userName
    }
}