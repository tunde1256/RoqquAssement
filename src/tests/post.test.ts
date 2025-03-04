import request from 'supertest';
import app from '../app'; 

describe('Post Controller', () => {
  describe('POST /posts/posts', () => {
    it('should create a post successfully', async () => {
      const newPost = {
        title: 'New Post',
        body: 'This is a new post.',
        user_id: 1
      };

      const response = await request(app)
        .post('/posts/posts') 
        .send(newPost);

      expect(response.status).toBe(201);
      
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Post created successfully');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(newPost.title);
      expect(response.body.data.body).toBe(newPost.body);
      expect(response.body.data.user_id).toBe(newPost.user_id);
    });

    it('should return an error if any required fields are missing', async () => {
      const incompletePost = {
        title: 'New Post'
      };

      const response = await request(app)
        .post('/posts/posts') 
        .send(incompletePost);

      expect(response.status).toBe(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Title, body, and user_id are required');
    });
  });
});
describe('GET /posts', () => {
    it('should return posts by user_id', async () => {
      const response = await request(app)
        .get('/posts') 
        .query({ user_id: 1 }); 
  
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Posts retrieved successfully');
      expect(response.body.data).toBeInstanceOf(Array); 
    });
  
    it('should return an error if user_id is not provided', async () => {
      const response = await request(app)
        .get('/posts') 
        .query({}); 
  
      expect(response.status).toBe(400); 
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User ID is required'); 
    });
  });


  describe('DELETE /posts/:id', () => {
    it('should delete a post successfully', async () => {
      const response = await request(app)
        .delete('/posts/17');
    
      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Post deleted successfully");
    });
  
    it('should return an error if ID is missing', async () => {
      const response = await request(app).delete('/posts/posts/');
    
      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Post ID must be a valid number");
    });
  
    it('should return an error if ID is invalid (non-number)', async () => {
      const response = await request(app)
        .delete('/posts/abc');
    
      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Post ID must be a valid number");
    });
  
    it('should return an error if the post does not exist', async () => {
      const response = await request(app)
        .delete('/posts/9999');
    
      expect(response.status).toBe(404);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Post not found");
    });
  });
  