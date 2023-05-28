const request = require('supertest');

const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should respond with status 200', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
    });
});



describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 12923-X',
        target: 'Kepler-186-f',
        launchDate: 'January 10, 1998'
    }

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 12923-X',
        target: 'Kepler-186-f',
    }

    const launchDataWithInvalidDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 12923-X',
        target: 'Kepler-186-f',
        launchDate: 'aoba'
    }

    test('It should respond with status 201', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(requestDate).toBe(responseDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch properties'
        })
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date'
        })
    });
})
