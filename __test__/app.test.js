const request = require('supertest');

const app = require('../bin/www').default;
const dataFile = require("../dist/database/database.json");

// afterEach(() =>{
//     app.close();
// })
// describe('GET /fetchData', function () {
    //     it('respond with json containing a list of all users', function (done) {
        //         request(app).get('/fetchData')
        //             .set('Accept', 'application/json')
        //             .expect('Content-Type', /json/)
        //             .expect(200, done);
        //     });
        // });
        describe('GET /fetchRecords', () => {
            test("respond with json containing a list of all data", function (done) {
                request(app)
                .get("/fetchRecords")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200, done);
            });
        });