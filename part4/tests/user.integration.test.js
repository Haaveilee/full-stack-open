const { describe, test, afterEach, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('users api', () => {    
    describe('GET', () => {
        afterEach(async () => {
            await User.deleteMany();
        });
    
        test('creates user with correct payload', async () => {
            const response = await api.post('/api/users', {
                username: 'test',
                password: '1233',
                name: 'a name'
            }).expect(201);
        });

        test('fails with short password', async () => {
            await api.post('/api/users', {
                username: 'test',
                password: '12',
                name: 'a name'
            }).expect(401);            
        });

        test('fails with short username', async () => {
            await api.post('/api/users', {
                username: 'te',
                password: '12',
                name: 'a name'
            }).expect(401);            
        });

        test('fails with duplicate username', async () => {
            await api.post('/api/users', {
                username: 'test',
                password: '1233',
                name: 'a name'
            }).expect(201);

            await api.post('/api/users', {
                username: 'test',
                password: '1233',
                name: 'a name'
            }).expect(500);
        });
    });
});