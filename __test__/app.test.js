const request = require('supertest');

const app = require('../dist/app').default;
const dataFile = require("../dist/database/database.json");




        describe('GET /fetchRecords', () => {
            test("respond with json containing a list of all data", function(done){
                request(app)
                .get("/fetchRecords")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200,done);
            });
            test("expect 404 for wrong route", function(done){
                request(app)
                .get("/fetch")
                .expect(404,done);
            });
        });
        
        let data = {
            "shape": "triangle",
            "dimension": {
                "a": 5,
                "b": 5,
                "c": 6
            }
        };
        let data2 = {
            "shape": "rectan",
            "dimension": {
                "a": 5,
                "b": 5
            }}
            describe("POST /calculate", () => {
            
                test("respond with 200 OK", function(done){
                    request(app)
                        .post("/calculate")
                        .send(data)
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(201,done)
                })
                
                test('respond with 400 bad response', function (done){
                    request(app)
                        .post('/calculate')
                        .send(data2)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /text/)
                        .expect("Enter a valid shape")
                        .expect(400,done)
                })
            });