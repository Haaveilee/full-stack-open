const { describe, test, afterEach, beforeEach, before, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { sampleBlogPost, sampleUser, sampleUser2, sampleLogin, sampleLogin2 } = require('./test-helpers');

const api = supertest(app)

describe('blog api', () => {    
    describe('DELETE', () => {
        let loginResponse;
        let secondLoginResponse;
        let blogPost;
            
        beforeEach(async () => {
            let blogPostResponse;
            await Blog.deleteMany();
            await User.deleteMany();
            await api.post('/api/users')
                .send(sampleUser)
                await api.post('/api/users')
                .send(sampleUser2)
            
            loginResponse = (await api
                .post('/api/login')
                .send(sampleLogin))
                .body
            
            secondLoginResponse = (await api
                .post('/api/login')
                .send(sampleLogin2))
                .body
            
            blogPostResponse = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${loginResponse.token}`)
                .send(sampleBlogPost)
            
            blogPost = blogPostResponse.body
        })

        describe('when posted with no auth header', () => {
            test('should fail', async () => {
                await api
                    .delete(`/api/blogs/${blogPost.id}`)
                    .expect(401)
            })
        });

        describe('for a logged in user', () => {
            test('should pass', async() => {
                await api
                    .delete(`/api/blogs/${blogPost.id}`)
                    .set('Authorization', `Bearer ${loginResponse.token}`)                    
                    .expect(204)
            });

            test('should fail for the invalid user', async () => {
                await api
                    .delete(`/api/blogs/${blogPost.id}`)
                    .set('Authorization', `Bearer ${secondLoginResponse.token}`)                    
                    .expect(401)
            })
        })
    });

    describe('POST', () => {
        afterEach(async () => {
            await Blog.deleteMany();
        });
    
        describe('when posted with no auth header', () => {
            test('should fail', async () => {
                await api
                    .post('/api/blogs')
                    .send(sampleBlogPost)
                    .expect(401)
            })
        });

        describe('for a logged in user', () => {
            let loginResponse;
            
            beforeEach(async () => {
                await User.deleteMany();
                await api.post('/api/users')
                    .send(sampleUser)                
                
                loginResponse = (await api
                    .post('/api/login')
                    .send(sampleLogin))
                    .body
            })

            test('should pass', async() => {
                await api
                    .post('/api/blogs')
                    .set('Authorization', `Bearer ${loginResponse.token}`)
                    .send(sampleBlogPost)
                    .expect(201)
            });
        })
    });

    describe('GET', () => {
        afterEach(async () => {
            await Blog.deleteMany();
        });
    
        describe('when has blog posts', () => {
            let response;
    
            beforeEach(async () => {
                await Blog.insertMany(sampleBlogPost);
                response = await api.get('/api/blogs')                
            });
    
            test('returns correct number of posts', () => {
                assert.strictEqual(response.body.length, 1);
            });
    
            test('the id field is named correctly', () => {
                assert.notEqual(response.body[0].id, undefined);
            });
        });
    });
});