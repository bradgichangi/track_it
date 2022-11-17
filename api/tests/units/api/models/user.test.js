const User = require('../../../../models/User');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../../dbConfig');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}, {}]});
            const all = await User.all;
            expect(all).toHaveLength(4)
        })
    });

    describe('get habits', () => {
        test('it resolves with users habits on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{}, {}, {}, {}]});
            const habits = await User.getHabits(1);
            expect(habits).toHaveLength(4)
        })
    });


    describe('delete', () => {
        test('it resolves with message on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ id: 1 });
            let testUser = new User({ id: 1, name: 'Test User'})
            const result = await testUser.delete();
            expect(result).toBe('User was deleted')
        })
    });

    describe('findById', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, name: 'Test User' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData ] });
            const result = await User.getUser(1);
            expect(result).toBeInstanceOf(User)
        })
    });

    describe('findByEmail', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, email: 'test@test.com', name: 'Test User' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData ] });
            const result = await User.findByEmail('test@test.com');
            expect(result).toBeInstanceOf(User)
        })
    });

    describe('create', () => {
        test('it resolves with user on successful db query', async () => {
            let habitData = { id: 1, name: 'New User' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await User.create('New User');
            expect(result).toBeInstanceOf(User)
        })
    });
//Before each add salt and hashed
    describe('signup', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, name: 'New User', email: 'test@test.com', password: 'Password' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ userData });
            await expect(User.signup(userData)).resolves.toEqual({
                validated: true,
                reason: 'You have successfully registered !',
                user: {
                    password: expect.anything(),
                    email: 'test@test.com'
                }
            })
            const result = await User.signup(userData);
            expect(result).toBeInstanceOf(User)
        })
        
    });

    // describe('password check', () => {
    //     test('it resolves with user on successful db query', async () => {
    //         let userData = { password: 'Test' }
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({ userData });
    //         let testUser = await User.signup({ id: 1, name: 'Test User'})
    //         const result = await testUser.passwordCheck('Test');
    //         expect(result).toBeBooleanOrNull()
    //     })
    // });

    //habit check

    //passwordcheck

    
})
