const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');
const employees = require('../models/Employee');

chai.use(chaiHttp);

before((done) => {
    employees.deleteMany({}, function (err) { });
    done();
})

describe('E. Employees Test Collection!', () => {

    it('E.1 Verify Employees are initially 0 ', (done) => {

        chai.request(server)
            .get('/employee/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });

    it('E.2 Test employee add operation ', (done) => {

        let emp = {
            Email: 'test10@testmail.com',
            FirstName: 'testF',
            LastName: 'testL',
            PhoneNumber: '078654565',
            Address: 'Mawanella, Sri Lanka',
            Designation: 'Designer',
            EmpStartDate: '2021-09-01',
            BasicSalary: 25000,
            AccountNumber: '34567',
            BankName: 'Test Bank',
            AccHolderName: 'testF testL',
            BranchName: 'Mawanella',
            Password: '1324',
        
        }

        chai.request(server)
            .post('/employee/add')
            .send(emp)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('E.3 Test employees GET operation ', (done) => {

        chai.request(server)
            .get('/employee/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('E.4 Test employees GET by email operation ', (done) => {

        chai.request(server)
            .get('/employee/by-email?Email=test10@testmail.com')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('E.5 Verify employees are now 1 ', (done) => {

        chai.request(server)
            .get('/employee/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('E.6 Update employee details ', (done) => {

        let empD = {
            
        }

        chai.request(server)
            .put('/employee/update?Email=test10@testmail.com')
            .send({PhoneNumber: '077654565', Designation: 'Tester', BasicSalary: 30000})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('employee updated successful!');
                done();
            });
    });

    

});
