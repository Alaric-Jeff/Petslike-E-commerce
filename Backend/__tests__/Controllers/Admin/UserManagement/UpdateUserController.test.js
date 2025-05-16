import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import UpdateUserController from '../../../../Controllers/Admin/UserManagement/UpdateUserController.js';

vi.mock('../../../../Services/UserLogics/UpdateUser.js', () => ({
  default: vi.fn()
}));

vi.mock('../../../../Models/UserModel.js', () => ({
  default: {
    findByPk: vi.fn()
  }
}));

const mockUpdateUser = vi.mocked(
  (await import('../../../../Services/UserLogics/UpdateUser.js')).default
);
const mockUserModel = vi.mocked(
  (await import('../../../../Models/UserModel.js')).default
);

describe('UpdateUserController', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/users', express.Router().put('/update', UpdateUserController));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Input Validation', () => {
    it('should return 400 if update form is not provided', async () => {
      const response = await request(app)
        .put('/users/update')
        .send({ userId: '123' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: 'Update Form is null'
      });
    });
  });

  describe('User Existence', () => {
    it('should return 400 if user does not exist', async () => {
      const userId = '999';
      const updateForm = { firstName: 'John' };
      mockUserModel.findByPk.mockResolvedValueOnce(null);

      const response = await request(app)
        .put('/users/update')
        .send({ userId, UpdateForm: updateForm });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: `Account not found for userId ${userId}`
      });
      expect(mockUserModel.findByPk).toHaveBeenCalledWith(userId);
    });
  });

  describe('Internal Server Error', () => {
    it('should return 500 if there is an internal error', async () => {
      const userId = '123';
      const updateForm = { firstName: 'John' };
      const error = new Error('Database error');
      mockUserModel.findByPk.mockRejectedValueOnce(error);

      const response = await request(app)
        .put('/users/update')
        .send({ userId, UpdateForm: updateForm });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
      expect(mockUserModel.findByPk).toHaveBeenCalledWith(userId);
    });
  });

  describe('Success', () => {
    it('should return 200 if user is updated successfully', async () => {
      const userId = '123';
      const updateForm = { firstName: 'John' };
      const mockUser = { userId, firstName: 'Old' };
      mockUserModel.findByPk.mockResolvedValueOnce(mockUser);
      mockUpdateUser.mockResolvedValueOnce();

      const response = await request(app)
        .put('/users/update')
        .send({ userId, UpdateForm: updateForm });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: 'Update Success'
      });
      expect(mockUserModel.findByPk).toHaveBeenCalledWith(userId);
      expect(mockUpdateUser).toHaveBeenCalledWith(userId, updateForm);
    });
  });
});
