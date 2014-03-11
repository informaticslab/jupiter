var testmodule = '../lib/neo4jconnect.js',
    request = require('supertest'),
    should = require('should'),
    express = require('express'),
    app = express();
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://localhost:7474');

describe('Neo4JTester', function() {
    require(testmodule)(app, db);
    describe('Write to Database', function() {
        it('should write to the neo4j database, delete what was written, and then spit the string back', function(done) {
            request(app).
                get('/addremove/hello').
                expect('Content-Type', 'text/plain').
                expect(200, 'hello', done);
        });
    });
});