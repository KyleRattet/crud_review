process.env.NODE_ENV = "test";

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var should = chai.should();
var Pets = require('../src/server/models/pets');
chai.use(chaiHttp);

describe('Pets', function (){

  Pets.collection.drop();

  beforeEach(function(done){
    var newPetOne = new Pets ({
      name: 'Ruffus',
      type: 'Dog',
      age: 11
    });
    newPetOne.save(function(err, data){
      done();
    });
  });
  afterEach(function(done){
    Pets.collection.drop();
    done();
  });

  //get all pets
  it('should list ALL pets on /api/pets', function(done){
    var newPetTwo = new Pets ({
      name: 'Garfield',
      type: 'Cat',
      age: 74
    });
    newPetTwo.save(function(err, data){
      chai.request(server)
        .get('/api/pets')
        .end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('name');
          res.body[0].name.should.equal('Ruffus');
          res.body[1].name.should.equal('Garfield');
          res.should.be.json;
          done();
        });
    });
  });


  //get one pet
  it('should list ONE pet on /api/pet', function(done){
    var newPetThree = new Pets ({
      name: 'Nemo',
      type: 'Fish',
      age: 12
    });
    newPetThree.save(function(err, data){
      chai.request(server)
        .get('/api/pet/' + data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('type');
          res.body.age.should.equal(12);
          done();
        });
    });
  });

  //post test
  it('should add a SINGLE pet on /pet post', function(done){
     var newPetFour = new Pets ({
        name: 'Simba',
        type: 'Lion',
        age: 3
      });
     chai.request(server)
      .post('/api/pet')
      .send(newPetFour)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.SUCCESS.should.have.property('name');
        res.body.SUCCESS.type.should.equal('Lion');
        done();
      });
  });


  //Put Route
  it('should update a SINGLE pet on /pet/<id> PUT', function(done){
    chai.request(server)
      .get('/api/pets')
      .end(function(err, res){
        chai.request(server)
          .put('/api/pet/' + res.body[0]._id)
          .send({'name': 'Mickey', 'type': 'Mouse', 'age': 40})
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.UPDATED.should.have.property('name');
            res.body.UPDATED.type.should.equal('Mouse');
            res.body.UPDATED.age.should.equal(40);
            done();
          });
      });
  });

  //Delete Route
  it('should delete a SINGLE pet on /pet/<id> DELETE', function(done){
    chai.request(server)
      .get('/api/pets')
      .end(function(err, res){
        chai.request(server)
          .delete('/api/pet/'+res.body[0]._id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.REMOVED.name.should.equal('Ruffus');
            res.body.REMOVED.type.should.equal('Dog');
            done();
          });
      });
  });

});
