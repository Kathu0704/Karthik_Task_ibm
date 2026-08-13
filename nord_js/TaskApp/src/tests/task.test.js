const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../index');
const User = require('../models/user');
const Task = require('../models/task');

describe('GET /tasks - Filter, Pagination and Sorting', () => {

    let user;
    let token;

    beforeAll(async () => {

        // Create test user
        user = await User.create({
            name: 'Task Test User',
            email: 'tasktest@example.com',
            password: 'MyPass777'
        });

        // Generate JWT
        token = jwt.sign(
            {
                _id: user._id.toString()
            },
            process.env.JWT_SECRET
        );
    });


    afterAll(async () => {

        // Delete test tasks
        await Task.deleteMany({
            owner: user._id
        });

        // Delete test user
        await User.deleteOne({
            _id: user._id
        });
    });


    test('should filter, paginate and sort tasks', async () => {

        // Create test tasks
        await Task.create([
            {
                description: 'Task One',
                completed: false,
                owner: user._id
            },
            {
                description: 'Task Two',
                completed: true,
                owner: user._id
            },
            {
                description: 'Task Three',
                completed: false,
                owner: user._id
            },
            {
                description: 'Task Four',
                completed: false,
                owner: user._id
            }
        ]);


        // Send GET request
        const response = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .query({
                completed: false,
                limit: 2,
                skip: 0,
                sortBy: 'createdAt:desc'
            })
            .expect(200);


        // Check response is an array
        expect(Array.isArray(response.body)).toBe(true);


        // Check pagination
        expect(response.body.length).toBe(2);


        // Check filtering
        response.body.forEach(task => {
            expect(task.completed).toBe(false);
        });


        // Check sorting
        const firstDate =
            new Date(response.body[0].createdAt).getTime();

        const secondDate =
            new Date(response.body[1].createdAt).getTime();

        expect(firstDate).toBeGreaterThanOrEqual(secondDate);

    });

});