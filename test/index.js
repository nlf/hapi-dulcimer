var HapiDulcimer = require('../');
var Dulcimer = require('dulcimer');
var Person = require('./models/person');

var Path = require('path');
var Rimraf = require('rimraf');
var Hapi = require('hapi');

var Lab = require('lab');

var lab = exports.lab = Lab.script();
var after = lab.after;
var before = lab.before;
var expect = Lab.expect;
var describe = lab.experiment;
var it = lab.test;


describe('hapi-dulcimer', function () {

    before(function (done) {

        Dulcimer.connect(Path.join(__dirname, 'test.db'));

        done();
    });

    it('creates a list route config', function (done) {

        var server = new Hapi.Server(0);
        server.route({ method: 'get', path: '/people', config: HapiDulcimer.list(Person) });

        server.inject({
            method: 'get',
            url: '/people'
        }, function (res) {

            expect(res.statusCode).to.equal(200);
            expect(res.result).to.be.an('array');
            expect(res.result.count).to.equal(0);
            expect(res.result.offset).to.equal(0);
            expect(res.result.total).to.equal(0);
            done();
        });
    });

    it('creates a create route config', function (done) {

        var person = { firstName: 'Joe', lastName: 'Schmoe' };
        var server = new Hapi.Server(0);
        server.route({ method: 'post', path: '/people', config: HapiDulcimer.create(Person) });

        server.inject({
            method: 'post',
            url: '/people',
            payload: JSON.stringify(person)
        }, function (res) {

            expect(res.statusCode).to.equal(201);
            expect(res.result).to.deep.equal({
                firstName: 'Joe',
                lastName: 'Schmoe',
                fullName: 'Joe Schmoe'
            });
            done();
        });
    });

    after(function (done) {

        Rimraf(Path.join(__dirname, 'test.db'), done);
    });
});
