import { match } from './pattern-matching';

describe('pattern-matching', () => {
  it('should return 2', () => {
    const candidate = match('2')({
      '1': 'one',
      '2': 'two',
      '_': 'default',
    });
    const expectedResult = 'two';
    expect(expectedResult).toEqual(candidate);
  });

  it('should return default', () => {
    const candidate = match('3')({
      '1': 'one',
      '2': 'two',
      '_': 'default',
    });
    const expectedResult = 'default';
    expect(expectedResult).toEqual(candidate);
  });

  it('should return undefined', () => {
    const candidate = match('3')({
      '1': 'one',
      '2': 'two',
    });
    const expectedResult = undefined;
    expect(expectedResult).toEqual(candidate);
  });

  it('should return two', () => {
    const candidate = match('2')({
      '1': 'one',
      '2': () => 'two',
      '3': 'three',
    });
    const expectedResult = 'two';
    expect(expectedResult).toEqual(candidate);
  });

  it('should return four', () => {
    const candidate = match('2')({
      '1': 'one',
      '2 | 4 | 5': 'four',
      '3': 'three',
    });
    const expectedResult = 'four';
    expect(expectedResult).toEqual(candidate);
  });

  it('should return fourFromFn', () => {
    const candidate = match('2')({
      '1': 'one',
      '2 | 4 | 5': () => 'fourFromFn',
      '3': 'three',
    });
    const expectedResult = 'fourFromFn';
    expect(expectedResult).toEqual(candidate);
  });

  it('should return four', () => {
    const candidate = match('2')({
      '1': 'one',
      '3..5': 'four',
    });
    const expectedResult = 'four';
    expect(expectedResult).toEqual(candidate);
  });

  it('should return undefined', () => {
    const candidate = match('3')({
      '1': 'one',
      '3..5': 'four',
    });
    const expectedResult = undefined;
    expect(expectedResult).toEqual(candidate);
  });

  it('should return five', () => {
    const candidate = match('2')({
      '1': 'one',
      '3..=5': 'five',
    });
    const expectedResult = 'five';
    expect(expectedResult).toEqual(candidate);
  });

  it('should return three', () => {
    const candidate = match('2')({
      '1': 'one',
      '3=..5': 'three',
    });
    const expectedResult = 'three';
    expect(expectedResult).toEqual(candidate);
  });
});
