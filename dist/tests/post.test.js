"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Post Controller', () => {
    describe('POST /posts/posts', () => {
        it('should create a post successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const newPost = {
                title: 'New Post',
                body: 'This is a new post.',
                user_id: 1
            };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/posts/posts')
                .send(newPost);
            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.message).toBe('Post created successfully');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.title).toBe(newPost.title);
            expect(response.body.data.body).toBe(newPost.body);
            expect(response.body.data.user_id).toBe(newPost.user_id);
        }));
        it('should return an error if any required fields are missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const incompletePost = {
                title: 'New Post'
            };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/posts/posts')
                .send(incompletePost);
            expect(response.status).toBe(400);
            expect(response.body.status).toBe('error');
            expect(response.body.message).toBe('Title, body, and user_id are required');
        }));
    });
});
describe('GET /posts', () => {
    it('should return posts by user_id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/posts')
            .query({ user_id: 1 });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Posts retrieved successfully');
        expect(response.body.data).toBeInstanceOf(Array);
    }));
    it('should return an error if user_id is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/posts')
            .query({});
        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('User ID is required');
    }));
});
describe('DELETE /posts/:id', () => {
    it('should delete a post successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete('/posts/17');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Post deleted successfully");
    }));
    it('should return an error if ID is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete('/posts/posts/');
        expect(response.status).toBe(400);
        expect(response.body.status).toBe("error");
        expect(response.body.message).toBe("Post ID must be a valid number");
    }));
    it('should return an error if ID is invalid (non-number)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete('/posts/abc');
        expect(response.status).toBe(400);
        expect(response.body.status).toBe("error");
        expect(response.body.message).toBe("Post ID must be a valid number");
    }));
    it('should return an error if the post does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete('/posts/9999');
        expect(response.status).toBe(404);
        expect(response.body.status).toBe("error");
        expect(response.body.message).toBe("Post not found");
    }));
});
