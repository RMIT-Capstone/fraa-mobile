import MockAsyncStorage from 'mock-async-storage';
const mockImpl = new MockAsyncStorage();
// jest.mock('@react-native-community/async-storage', () => mockImpl);
let mocka = {};
jest.mock('react-native-location', () => mocka);
