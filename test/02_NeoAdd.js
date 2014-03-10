var testmodule = '../lib/reverser.js',
    request = require('supertest'),
    should = require('should'),
    express = require('express'),
    app = express();

describe('Neo4JTester', function() {
    require(testmodule)(app);
    describe('Write to Database', function() {
        it('should write to the neo4j database, and then delete what was written', function(done) {
            request(app).
                get('/reverse/hello').
                expect('Content-Type', 'text/plain').
                expect(200, 'olleh', done);
        });
    });
});