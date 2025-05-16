// Mock needs to be defined before imports
vi.mock('../../../Services/UserLogics/SignInService.js', () => ({
    default: vi.fn()
}));

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import session from 'express-session';
import SignInController from '../../../Controllers/Users/SignInController.js';

// Get the mocked function
const mockSignInService = vi.mocked(await import('../../../Services/UserLogics/SignInService.js')).default;

describe('SignInController', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());

        app.use(session({
            secret: 'test-secret',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }
        }));
       
        app.use('/auth', express.Router().post('/sign-in', SignInController));
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('Input Validation', () => {
        it('should return 400 when email is missing', async () => {
            const response = await request(app)
                .post('/auth/sign-in')
                .send({ password: 'password123' });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Incomplete fields');
        });

        it('should return 400 when password is missing', async () => {
            const response = await request(app)
                .post('/auth/sign-in')
                .send({ email: 'jefsohandsome1@gmail.com' });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Incomplete fields');
        });

        it('should return 400 when request body is empty', async () => {
            const response = await request(app)
                .post('/auth/sign-in')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Incomplete fields');
        });
    });

    describe('Authentication', () => {
        it('should successfully sign in a user and create session', async () => {
            const mockUser = {
                userId: 1,
                email: 'jefsohandsome1@gmail.com'
            };

            // Mock the service to return a resolved promise
            mockSignInService.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/auth/sign-in')
                .send({
                    email: 'jefsohandsome1@gmail.com',
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Sign in successful');
            
            // Check if session was created
            expect(response.headers['set-cookie']).toBeDefined();
        });

        it('should return 404 if user does not exist', async () => {
            // Mock the service to throw a "User not found" error
            mockSignInService.mockRejectedValue(new Error("User not found"));

            const response = await request(app)
                .post('/auth/sign-in')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('User not found');
        });

        it('should handle invalid credentials', async () => {
            // Mock the service to throw an "Invalid password" error
            mockSignInService.mockRejectedValue(new Error("Invalid password"));

            const response = await request(app)
                .post('/auth/sign-in')
                .send({
                    email: 'jefsohandsome1@gmail.com',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid credentials');
            expect(response.body.error).toBe('Invalid password');
        });

        it('should handle internal server errors', async () => {
            const error = new Error('Database connection failed');
            mockSignInService.mockRejectedValue(error);

            const response = await request(app)
                .post('/auth/sign-in')
                .send({
                    email: 'jefsohandsome1@gmail.com',
                    password: 'password123',
                });

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Internal server error');
            expect(response.body.error).toBe('Database connection failed');
        });
    });
});