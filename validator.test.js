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

describe('Geri variantai', () => {
  test('single required', () => {
    const target = {};
    const rules = {};
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('single required', () => {
    const target = {
      name: 'Petras',
    };
    const rules = {
      required: ['name'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('many required', () => {
    const target = {
      name: 'Petras',
      age: 55,
      isMarried: true,
    };
    const rules = {
      required: ['name', 'age', 'isMarried'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('single required, single optional: not present', () => {
    const target = {
      name: 'Petras',
    };
    const rules = {
      required: ['name'],
      optional: ['color'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('many required, single optional: not present', () => {
    const target = {
      name: 'Petras',
      age: 55,
      isMarried: true,
    };
    const rules = {
      required: ['name', 'age', 'isMarried'],
      optional: ['color'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('single required, single optional: present', () => {
    const target = {
      name: 'Petras',
      color: 'red',
    };
    const rules = {
      required: ['name'],
      optional: ['color'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('many required, single optional: present', () => {
    const target = {
      name: 'Petras',
      age: 55,
      isMarried: true,
      color: 'red',
    };
    const rules = {
      required: ['name', 'age', 'isMarried'],
      optional: ['color'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('single required, single optional: not present', () => {
    const target = {
      name: 'Petras',
    };
    const rules = {
      required: ['name'],
      optional: ['color', 'pet', 'kids'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('many required, many optional: some present', () => {
    const target = {
      name: 'Petras',
      age: 55,
      isMarried: true,
      color: 'red',
      pet: 'Rex',
    };
    const rules = {
      required: ['name', 'age', 'isMarried'],
      optional: ['color', 'pet', 'kids'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('many required, many optional: all present', () => {
    const target = {
      name: 'Petras',
      age: 55,
      isMarried: true,
      color: 'red',
      pet: 'Rex',
      kids: 2,
    };
    const rules = {
      required: ['name', 'age', 'isMarried'],
      optional: ['color', 'pet', 'kids'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('no required, many optional: no present', () => {
    const target = {};
    const rules = {
      optional: ['color', 'pet', 'kids'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('no required, many optional: some present', () => {
    const target = {
      color: 'red',
    };
    const rules = {
      optional: ['color', 'pet', 'kids'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })

  test('no required, many optional: all present', () => {
    const target = {
      name: 'Petras',
      age: 55,
      isMarried: true,
      color: 'red',
      pet: 'Rex',
      kids: 2,
    };
    const rules = {
      optional: ['color', 'pet', 'kids'],
    };
    const [err, msg] = validator(target, rules)
    expect(err).toBe(false);
    expect(msg).toBe('OK');
  })
})

