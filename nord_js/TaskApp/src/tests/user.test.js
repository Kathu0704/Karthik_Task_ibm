const request = require('supertest');

const app = require('../index');
const User = require('../models/user');

describe('User API Tests', () => {

    // Test User Signup
    test('should signup a new user', async () => {

        const response = await request(app)
            .post('/users')
            .send({
                name: 'Test User',
                email: 'usertest@example.com',
                password: 'MyPass777'
            })
            .expect(201);

        expect(response.body.user).toBeDefined();
        expect(response.body.user.name).toBe('Test User');
        expect(response.body.user.email).toBe('usertest@example.com');

        // JWT token should be returned
        expect(response.body.token).toBeDefined();
    });


    // Test User Login
    test('should login an existing user', async () => {

        const response = await request(app)
            .post('/users/login')
            .send({
                email: 'usertest@example.com',
                password: 'MyPass777'
            })
            .expect(200);

        expect(response.body.user).toBeDefined();
        expect(response.body.token).toBeDefined();
    });


    // Test Get Profile
    test('should get user profile using JWT token', async () => {

        // Login first to get token
        const loginResponse = await request(app)
            .post('/users/login')
            .send({
                email: 'usertest@example.com',
                password: 'MyPass777'
            })
            .expect(200);

        const token = loginResponse.body.token;


        // Use token to access /users/me
        const response = await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.name).toBe('Test User');
        expect(response.body.email).toBe('usertest@example.com');
    });

});