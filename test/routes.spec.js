const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {

  it('should return the home page with text', () => {
    return chai.request(server)
    .get('/')
    .then((response) => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch((error) => {
      throw error;
    });
  });

  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
    .get('/sad')
    .then((response) => {
      response.should.have.status(404);
    })
    .catch((error) => {
      throw error;
    });
  });

});

describe('API Routes', () => {

  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      })
      .done();

  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      })
      .done();
  });

  describe('GET /api/v1/foods', () => {

    it('should return all the foods', () => {
      return chai.request(server)
        .get('/api/v1/foods')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].name.should.equal('Bagel');
          response.body[0].calories.should.equal(245);
        })
        .catch((error) => {
          throw error;
        });
    });

  });

  describe('GET /api/v1/foods/:id', () => {

    it('should return the food by ID', () => {
      return chai.request(server)
        .get('/api/v1/foods/1')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].name.should.equal('Bagel');
          response.body[0].calories.should.equal(245);
        })
        .catch((error) => {
          throw error;
        });
    });
    it('should return a 404 if food not found', () => {
      return chai.request(server)
        .get('/api/v1/foods/18885')
        .then((response) => {
          response.should.have.status(404)
        })
        .catch((error) => {
          throw error;
        });
    });

  });

  describe('POST /api/v1/foods', () => {

    it('should add a food', () => {
      return chai.request(server)
        .post('/api/v1/foods')
        .send({
          foods: {name: "Spanakopita",
          calories: 285}
        })
        .then((response) => {
          response.should.have.status(200);
          response.body[0].should.be.a('object');
          response.body[0].name.should.equal('Spanakopita');
          response.body[0].calories.should.equal(285);
        })
        .catch((error) => {
          throw error;
        });
    });

    it('should sends an error when no food is sent', () => {
      return chai.request(server)
        .post('/api/v1/foods')
        .send({})
        .then((response) => {
          response.should.have.status(400)
          response.body.error.should.equal('No food property provided!')
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe('PATCH /api/v1/foods/:id', () => {

    it('should update a food', () => {
      return chai.request(server)
        .patch('/api/v1/foods/1')
        .send({
          food: {name: "Spanakopita",
          calories: 285}
        })
        .then((response) => {
          response.should.have.status(200);
          response.body[0].should.be.a('object');
          response.body[0].name.should.equal('Spanakopita');
          response.body[0].calories.should.equal(285);
        })
        .catch((error) => {
          throw error;
        });
    });

    it('should return a 404 if food not found', () => {
      return chai.request(server)
        .patch('/api/v1/foods/18885')
        .send({
          food: {name: "Spanakopita",
          calories: 285}
        })
        .then((response) => {
          response.should.have.status(404)
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe('DELETE /api/v1/foods/:id', () => {
    it('should delete a food', () => {
      return chai.request(server)
        .delete('/api/v1/foods/1')
        .then((response) => {
          response.should.have.status(204)
        })
        .catch((error) => {
          throw error;
        });
    });
    it('should return a 404 if food not found', () => {
      return chai.request(server)
        .delete('/api/v1/foods/18885')
        .then((response) => {
          response.should.have.status(404)
        })
        .catch((error) => {
          throw error;
        });
    });
  });

});
