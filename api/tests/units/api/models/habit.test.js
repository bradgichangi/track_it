const Habit = require('../../../../models/Habit');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../../dbConfig');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with authors on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}, {}]});
            const all = await Habit.all;
            expect(all).toHaveLength(4)
        })
    });


    describe('destroy', () => {
        test('it resolves with message on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ id: 1 });
            let testHabit = new Habit({ id: 1, name: 'Test Habit'})
            const result = await testHabit.delete();
            expect(result).toBe('Habit was deleted')
        })
    });

    describe('findById', () => {
        test('it resolves with author on successful db query', async () => {
            let habitData = { id: 1, name: 'Test Habit' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.findHabit(1);
            expect(result).toBeInstanceOf(Habit)
        })
    });

    describe('create', () => {
        test('it resolves with author on successful db query', async () => {
            let habitData = { id: 1, name: 'New Habit' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.create('New Habit');
            expect(result).toBeInstanceOf(Habit)
        })
    });

    
})
