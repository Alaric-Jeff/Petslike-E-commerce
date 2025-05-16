import { describe, it, expect, beforeEach, afterEach, vi, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import DeleteUserController from '../../../../Controllers/Admin/UserManagement/DeleteUserController.js';

vi.mock('../../../../Services/UserLogics/DeleteUser.js', () => ({
  default: vi.fn()
}));

vi.mock('../../../../Models/UserModel.js', () => ({
  default: {
    findOne: vi.fn()
  }
}));

let mockDeleteUser;
let mockUserModel;

beforeAll(async () => {
  mockDeleteUser = (await import('../../../../Services/UserLogics/DeleteUser.js')).default;
  mockUserModel = (await import('../../../../Models/UserModel.js')).default;
});

describe('DeleteUserController', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/users', express.Router().delete('/:userId', DeleteUserController));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return 400 status if user id is not provided', async () => {
    const appWithoutParam = express();
    appWithoutParam.use(express.json());
  
    appWithoutParam.use('/users', express.Router().delete('/', DeleteUserController)); // catch /users/ directly
  
    const response = await request(appWithoutParam).delete('/users');
    console.log('Received status:', response.status, '| Expected: 400');
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User Id is undefined');
  });
  

  describe('User Existence', () => {
    it('should return 400 status if user does not exist', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);

      const response = await request(app).delete('/users/999');
      console.log('Received status:', response.status, '| Expected: 400');
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Account doesn't exist");
    });
  });

  describe('Internal Server Error', () => {
    it('should return 500 status if there is an error', async () => {
      mockUserModel.findOne.mockResolvedValueOnce({ userId: 123 });
      mockDeleteUser.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app).delete('/users/123');
      console.log('Received status:', response.status, '| Expected: 500');
      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Internal server error');
    });
  });

  describe('Success', () => {
    it('should return 200 status if user is deleted successfully', async () => {
      mockUserModel.findOne.mockResolvedValueOnce({ userId: 123 });
      mockDeleteUser.mockResolvedValueOnce();

      const response = await request(app).delete('/users/123');
      console.log('Received status:', response.status, '| Expected: 200');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Successfully deleted user 123');
    });
  });
});
