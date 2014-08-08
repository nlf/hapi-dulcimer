var Dulcimer = require('dulcimer');

var Person = new Dulcimer.Model({
    firstName: {
        type: 'string',
        required: true
    },
    lastName: {
        type: 'string',
        required: true
    },
    age: {
        type: 'number',
        default: 30
    },
    fullName: {
        derive: function () {

            return this.firstName + ' ' + this.lastName;
        }
    }
}, {
    name: 'person'
});

module.exports = Person;
