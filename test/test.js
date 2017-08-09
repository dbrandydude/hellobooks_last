import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import db from '../server/models';

const should = chai.should();
chai.use(chaiHttp);

describe('routes: books', () => {
    describe('GET /api/books', () => {
        it('should respond an array of all books', (done) => {
            chai.request(server)
                .get('/api/books')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal('application/json');
                    res.body.should.be.an('array');
                    res.body[0].should.include.keys(
                        'id',
                        'isbn',
                        'title',
                        'author',
                        'published',
                        'description',
                        'qty',
                        'createdAt',
                        'updatedAt'
                    );
                    done();
                });
        });
    });
});
