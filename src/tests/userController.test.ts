import request from 'supertest'; 
import app from '../app';
import * as userModel from '../models/user.model'; 
import { successResponse, errorResponse, validationErrorResponse } from '../utils/response';

jest.mock('../models/user.model');

describe('User Controller Tests', () => {

  it('should create a user successfully', async () => {
    const newUser = { full_name: 'John Doe', email: 'john.doe@example.com' };

    jest.spyOn(userModel, 'createUser').mockResolvedValue({
      id: 1,
      ...newUser,
    });

    const response = await request(app)
      .post('/users') 
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.email).toBe(newUser.email);
  });

  it('should return an error if email already exists', async () => {
    const existingUser = { full_name: 'Jane Doe', email: 'jane.doe@example.com' };

    jest.spyOn(userModel, 'getUserByEmail').mockResolvedValue(existingUser);

    const response = await request(app)
      .post('/users')
      .send({ full_name: 'John Doe', email: existingUser.email });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('User with this email already exists');
  });
  it('should return users with pagination', async () => {
    const users = [
      { id: 1, full_name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, full_name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];
  
    const totalCount = 2; 
  
    jest.spyOn(userModel, 'getUsers').mockResolvedValue(users);
    jest.spyOn(userModel, 'getUserCount').mockResolvedValue(totalCount);  
    const response = await request(app).get('/users?pageNumber=1&pageSize=2');
  
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.length).toBe(2);
    expect(response.body.pagination.totalCount).toBe(totalCount);
    expect(response.body.pagination.totalPages).toBe(1);  
  });
  

  it('should return a user by ID', async () => {
    const user = { id: 1, full_name: 'John Doe', email: 'john.doe@example.com' };

    jest.spyOn(userModel, 'getUserById').mockResolvedValue(user);

    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('id', 1);
    expect(response.body.data.email).toBe(user.email);
  });

  it('should return an error if user not found', async () => {
    jest.spyOn(userModel, 'getUserById').mockResolvedValue(null);

    const response = await request(app).get('/users/999');

    expect(response.status).toBe(404);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('User not found');
  });
});
