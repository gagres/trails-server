// Require the dev-dependencies
let chai     = require('chai'),
    chaiHttp = require('chai-http'),
    server   = require('../app.js'),
    expect   = chai.expect,
    assert   = chai.assert;

chai.use(chaiHttp);

describe('User - Routes', () => {
    describe('/GET users', () => {
        it('Should return a list of users in the system', (done) => {
            chai.request(server)
                .get('/users')
                .end( (err, res) => {
                    if(err) done(err);

                    expect(res).have.status(200);
                    expect(res.body).be.a('array');
                    assert.isArray(res.body)
                    done();
                })
        })
    })
})