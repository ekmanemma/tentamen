// Mongoose and mocking requests
const sinon = require('sinon');

const mongoose = require('mongoose')
mongoose.set('debug', true)
require('sinon-mongoose')

// initialize the app and models
const app = require('../../index.js')

// sending requests
const agent = require('supertest').agent(app);
// validating results
const expect = require('chai').expect;

// get the model
const Book = mongoose.model('Book')

var mock = sinon.mock(Book)

beforeEach(() => {
	mock.restore(); // Unwraps the spy
	mock = sinon.mock(Book)
});

afterEach( () => {
	mock.verify();
});

describe('Book Integration tests', () => {

	const expected = {
		"Location": {
			"City": "Redmond",
			"Street": "156TH AVE NE"
		},
		"_id": "5ec3821c50c556787d4ed79d",
		"Title": "Book",
		"Author": "Mark Michaelis",
		"Price": 59.99,
		"SellerEmail": "someone@someplace.com",
		"Used": true,
		"__v": 0	
	}

	const request = {
		"ISBN":"9780321877581",
		"Title":"Book",
		"Author":"Mark Michaelis",
		"Price":"59.99",
		"SellerEmail":"someone@someplace.com",
		"Used":true,
		"Location":{
			"City":"Redmond",
			"Street":"156TH AVE NE"}
	}

	describe('books.get', ()  => {

		it('Should return an array of all books', (done) => {

			mock
			.expects('find')
			.chain('exec')
			.resolves([expected]);

			agent
			.get('/books')
			.end((err,res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.eql([expected]);
				done();
			});
		});

		it('Should get a book by title', (done) => {

			mock
			.expects('find')
			.withArgs({"Title": "Book"})
			.chain('exec')
			.resolves(expected);

			agent
			.get('/books?Title=Book')
			.end((err,res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.eql(expected);
				done();
			});
		});

		it('Should get a book by id', (done) => {

			mock
			.expects('findOne')
			.withArgs({_id: "5ec3821c50c556787d4ed79d"})
			.chain('exec')
			.resolves(expected);
	
			agent
			.get('/books/5ec3821c50c556787d4ed79d')
			.end((err,res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.eql(expected);
				done();
			});
		});
	});

	describe('books.add', ()  => {

		it('Should be able to create a book', (done) => {

			mock
			.expects('create')
			.withArgs(request)
			.chain('exec')
			.resolves(expected);

			agent
			.post('/books')
			.send(request)
			.end((err,res) => {
				expect(res.status).to.equal(201);
				expect(res.body).to.eql(expected);
				done();
			});
		});
	});
	
	describe('books.updateBook', ()  => { 

		it('Should be able to update a book', (done) => {

			mock
			.expects('updateOne')
			.withArgs({ _id: "5ec3821c50c556787d4ed79d" }, request)
			.chain('exec')
			.resolves({ n: 1,
				nModified: 1,
				ok: 1 });

				mock
				.expects('findById')
				.withArgs("5ec3821c50c556787d4ed79d")
				.chain('exec')
				.resolves(expected)

			agent
			.put('/books/5ec3821c50c556787d4ed79d')
			.send(request)
			.end((err,res) => {
				expect(res.status).to.equal(200);
				done();
			});
		});

		it('Should return 204 when not updating a student', (done) => {
			// Given (preconditions)
			mock
			.expects('updateOne')
			.withArgs({ _id: "5ec3821c50c556787d4ed79d" }, request)
			.chain('exec')
			.resolves({ n: 1,
				nModified: 0,
				ok: 1 });

			// When (someting happens)
			agent
			.put('/books/5ec3821c50c556787d4ed79d')
			.send(request)
			.end((err,res) => {
			// Then (something should happen)
				expect(res.status).to.equal(204);
				done();
			});
		});

    // it('Should be able to update a book', (done) => {

		// 	mock
    //   .expects('findOneAndUpdate')
    //   .withArgs({ _id: "5ec3821c50c556787d4ed79d" }, request)
    //   .chain('exec')
    //   .resolves(expected);

    //   agent
    //   .put('/books/5ec3821c50c556787d4ed79d')
    //   .send(request)
    //   .end((err,res) => {
    //     expect(res.status).to.eql(200);
    //     done();
    //   });
		// });
	});
	
	describe('books.deleteBook', ()  => { 

    it('Should be able to delete a book', (done) => {

			mock
      .expects('findByIdAndDelete')
      .withArgs("5ec3821c50c556787d4ed79d")
      .chain('exec')
      .resolves(expected);

      agent
      .delete('/books/5ec3821c50c556787d4ed79d')
      .send(request)
      .end((err,res) => {
        expect(res.status).to.eql(200);
        done();
      });
    });
  });
});