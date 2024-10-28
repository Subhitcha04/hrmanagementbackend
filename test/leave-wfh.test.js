const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');
const leaveWfh = require('../models/LeaveWFH');

chai.use(chaiHttp);

before((done) => {
    leaveWfh.deleteMany({}, function (err) { });
    done();
})

describe('L. Leave & WFH Test Collection!', () => {

    it('L.1 Verify Leave & WFH are initially 0 ', (done) => {

        chai.request(server)
            .get('/lwfh/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });

    it('L.2 Test leave & WFH POST operation ', (done) => {

        let leave = {
            Email: 'test@testmail.com',
            ReqType: 'leave',
            RequestDate: '2022-02-04',
            Month: 'February',
            Reason: 'Sick',
        }

        chai.request(server)
            .post('/lwfh/request')
            .send(leave)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('L.3 Test Leave & WFH GET operation ', (done) => {

        chai.request(server)
            .get('/lwfh/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // const myVal = res.body.message;
                // expect(myVal).to.be.equal('Message specified in the index.js');
                done();
            });
    });

    it('L.4 Test Leave & WFH GET by email operation ', (done) => {

        chai.request(server)
            .get('/lwfh/list-by-employee?Email=test@testmail.com')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('L.5 Verify Leave & WFH are now 1 ', (done) => {

        chai.request(server)
            .get('/lwfh/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('L.6 Filter Leave & WFH by type ', (done) => {

        chai.request(server)
            .get('/lwfh/list-by-type?ReqType=wfh')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });

    it('L.6 Filter Leave & WFH by initial status ', (done) => {

        chai.request(server)
            .get('/lwfh/list-by-status?Status=Pending')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

});
