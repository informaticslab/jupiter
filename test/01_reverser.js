var testmodule = '../lib/reverser.js',
    request = require('supertest'),
    should = require('should'),
    express = require('express'),
    app = express();

describe('Reverser', function() {
    require(testmodule)(app);
    describe('GET /reverse', function() {
        it('should reverse the string', function(done) {
            request(app).
                get('/reverse/hello').
                expect('Content-Type', 'text/plain').
                expect(200, 'olleh', done);
        });
    });
});