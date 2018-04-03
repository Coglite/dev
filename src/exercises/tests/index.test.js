import { increm, concatThrow, concatCallback, concatAsync } from '..';

describe('src | utils', () => {
  describe('increm', () => {
    test('should increm', () => {
      expect(increm(1)).toEqual(2);
    });
  });
  describe('concat', () => {
    test('should concat', () => {
      expect(concatThrow('Hello', 'World')).toEqual('Hello - World');
    });
    test('should Throw error', () => {
      expect(() => concatThrow('HelXlo', 'World')).toThrow(new Error('Forbidden concat'));
    });
  });

  describe('concatCallback', () => {
    test('should concatCallback result', () => {
      concatCallback('Hello', 'World', (error, result) => {
        expect(result).toEqual('Hello - World');
      });
    });

    test('should concatCallback Throw Error', () => {
      concatCallback('HXello', 'World', error => {
        expect(error).toEqual(new Error('Forbidden concat'));
        expect(error).toBeInstanceOf(Error);
      });
    });

    test('should concatCallback Throw TypeError', () => {
      concatCallback(1, 'World', error => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });

  describe('concatAsync', () => {
    test('should concatAsync', done => {
      concatAsync('Hello', 'World', (error, result) => {
        expect(result).toEqual('Hello - World');
        done();
      });
    });
  });

  describe('concatAsync', () => {
    test('should concatAsync catch', done => {
      concatAsync('heXllo', 'World', error => {
        expect(error).toBeInstanceOf(Error);
        done();
      });
    });
  });
});
