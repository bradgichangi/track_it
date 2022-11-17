const habitsController = require('../../../../controller/habits');
const Habit = require('../../../../models/Habit');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('Habit controller', () => {
    beforeEach(() =>  jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe('displayAll', () => {
        test('returns all habits with a 200 status code', async () =>{
            const testData = ['habit1', 'habit2', 'habit3'];

            // (object, methodName, accessType?)
            jest.spyOn(Habit, 'all', 'get')
                 .mockResolvedValue(testData);
            await habitsController.displayAll(null, mockRes);

            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testData);
        })
    })

    describe('getHabit', () => {
        test('return a habit by id with a 200 status code', async () => {
            const testData = {id: 1, name: 'habit1', desc: null};
            const mockReq = { params: { id: 1 } }

            jest.spyOn(Habit, 'findHabit')
                .mockResolvedValue(testData)

            await habitsController.getHabit(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testData);
        })
    })

    // error
    describe('create', () => {
        test('create a new habit with a 201 status code', async() => {
            const testData = {name: 'habit4', desc: null, freq: 1, start_date: '2022-11-01', user_id: 4};
            const mockReq = { body: testData }
            
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(testData);

            await habitsController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testData));
        })
    })

// Cannot spy the update property because it is not a function; undefined given instead
    describe('update', () => {
        test('update habits info with a 200 status code', async () => {
            const testData = {name: 'habit1', desc: null, freq: 1, start_date: '2022-11-01', last_completed: '2022-12-26', streak: 4, user_id: 1};
            const mockReq = { body: testData };

            jest.spyOn(Habit, 'update')
                .mockResolvedValue(testData);
            await habitsController.update(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testData);
        })
    })

    // fail: status code 500
    describe('destroy', () => {
        test('delete a habit with a 204 status code', async() => {
            jest.spyOn(Habit.prototype, 'delete')
                .mockResolvedValue("Habit was deleted");
            
            const mockReq = { params: { id: 1 } }
            await habitsController.destroy(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(204);
        })
    })
})