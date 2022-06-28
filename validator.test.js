const validator = require('./validator.js');

describe('Blogi tipai', () => {
  test('empty', () => {
    const [err, msg] = validator();
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas objektas');
  })

  test('number', () => {
    const [err, msg] = validator(1);
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas objektas');
  })

  test('string', () => {
    const [err, msg] = validator('');
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas objektas');
  })

  test('boolean', () => {
    const [err, msg] = validator(true);
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas objektas');
  })

  test('null', () => {
    const [err, msg] = validator(null);
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas objektas');
  })

  test('array', () => {
    const [err, msg] = validator([]);
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas objektas');
  })

  test('no structure', () => {
    const [err, msg] = validator({});
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas strukturos objektas');
  })

  test('structure: number', () => {
    const [err, msg] = validator({}, 1);
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas strukturos objektas');
  })

  test('structure: string', () => {
    const [err, msg] = validator({}, '');
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas strukturos objektas');
  })

  test('structure: boolean', () => {
    const [err, msg] = validator({}, false);
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas strukturos objektas');
  })

  test('structure: null', () => {
    const [err, msg] = validator({}, null);
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas strukturos objektas');
  })

  test('structure: aarray', () => {
    const [err, msg] = validator({}, []);
    expect(err).toBe(true);
    expect(msg).toBe('Neduotas strukturos objektas');
  })

})