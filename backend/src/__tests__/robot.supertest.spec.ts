import { server } from '..';
import request from 'supertest';
import { initDB } from '../db/init.db';
import { mongooseConnect } from '../db/mongoose';
import jwt from 'jsonwebtoken';
import { app } from '../app';

describe('Given the routes of /robot', () => {
    let data: { [key: string]: Array<any> };
    let token: string;
    beforeEach(async () => {
        data = await initDB();
        await mongooseConnect();
        token = jwt.sign(
            { id: data.users[0].id, name: data.users[0].name },
            process.env.SECRET as string
        );
    });
    afterEach(async () => {
        server.close();
    });
    describe('When method GET is used', () => {
        test('If i am not logged, then status should be 401 ', async () => {
            const response = await request(app).get('/robot/');
            expect(response.statusCode).toBe(401);
        });

        test('If i am not logged, then status should be 401 ', async () => {
            const response = await request(app)
                .get('/robot/')
                .set('authorization', 'Bearer ' + token);
            expect(response.statusCode).toBe(200);
        });
    });
    describe('When method GET used in /:id route', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).get(
                `/robot/${data.robots[0].id}`
            );
            expect(response.statusCode).toBe(401);
        });
        test('If I am logged, then status should be 200', async () => {
            const response = await request(app)
                .get(`/robot/${data.robots[0].id}`)
                .set('authorization', 'Bearer ' + token);
            expect(response.statusCode).toBe(200);
        });
    });
    describe('When method POST is used', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).post('/robot/');
            expect(response.statusCode).toBe(401);
        });
        test('If I am logged, then status should be 201', async () => {
            const newRobot = {
                name: 'robot1',
                img: 'test',
                velocity: 1,
                resistence: 2,
                date: 'test',
                owner: data.users[0].id,
            };
            const response = await request(app)
                .post('/robot/')
                .set('authorization', 'Bearer ' + token)
                .send(newRobot);
            expect(response.statusCode).toBe(201);
        });
    });
    describe('When method PATCH is used', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).patch(
                `/robot/${data.robots[0].id}`
            );
            expect(response.statusCode).toBe(401);
        });
        test('If I am logged, then status should be 201', async () => {
            const response = await request(app)
                .patch(`/robot/${data.robots[0].id}`)
                .set('authorization', 'Bearer ' + token)
                .send({ name: 'test' });
            expect(response.statusCode).toBe(200);
        });
    });
    describe('When method DELETE is used', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).delete(
                `/robot/${data.robots[0].id}`
            );
            expect(response.statusCode).toBe(401);
        });

        test('If I am logged, then status should be 202', async () => {
            const response = await request(app)
                .delete(`/robot/${data.robots[0].id}`)
                .set('authorization', 'Bearer ' + token)
                .send(data.robots[0].id);
            expect(response.statusCode).toBe(200);
        });
    });
});
