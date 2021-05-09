const request = require('supertest');
const app = require('../dist/index');
const dataFile = require("../dist/database/database.json")
afterEach(() =>{
    app.close();
})

/**
 * Testing get all user endpoint
 */
 describe('GET /api/data', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app).get('/api/data')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
/**
 * Testing get a user endpoint by giving an existing user
 */
 describe('GET /api/data/:id', function () {
    it('respond with json containing a single user', function (done) {
        request(app)
            .get('/api/data/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
/**
 * Testing get a user endpoint by giving a non-existing user
 */
 describe('GET /api/data/:id', function () {
    it('respond with json user not found', function (done) {
        request(app)
            .get('/api/data/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('"Data with that id does not exist"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
/**
 * Testing post user endpoint
 */
 describe('POST /api/data', function () {
    let data = {
        "organization": "node ninja",
        "products": [
            "developers",
            "pizza"
        ],
        "marketValue": "90%",
        "address": "sangotedo",
        "ceo": "cn",
        "country": "Taiwan",
        "noOfEmployees": 2,
        "employees": [
            "james bond",
            "jackie chan"
        ]
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/api/data')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
/**
 * Testing put user endpoint
 */
 describe('PUT /api/data', function () {
    let data = {
        "ceo": "dummy",
        "organisation": "dummy",
        "address": "dummy"
    }
    it('respond with 200 user updated', function (done) {
        request(app)
            .put('/api/data/2')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
/**
 * Testing get a user endpoint by giving an existing user
 */
 describe('DELETE /api/data/:id', function () {
    it('expected to delete a single user', function (done) {
        request(app)
            .delete(`/api/data/${dataFile[dataFile.length-1].id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(`User detail with ID number ${dataFile[dataFile.length-1].id} deleted`)
            .expect(200, done);
    });
});