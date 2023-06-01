import request from 'supertest';
import app from '../src/app';

// Assuming the weapon data is stored in a JSON file named 'weapons.json'

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        notes: 'any :name is to be repleaced with the name of the item you are trying to search for.',
        message: 'endpoints: ',
        endpoints: ['/weapons, /weapons/:name', '/consumables, /consumables/:name', '/tools, /tools/:name', '/traps, /traps/:name', '/throwables, /throwables/:name', '/melees, /melees/:name'],
      }, done);
  });
});

describe('weapons Endpoint Test', () => {
  test('Endpoint should return the correct subset of objects', async () => {
    const expectedObjects = [
      {
        'name': 'SW-SH 629',
        'type': 'pistol',
        'slot': 'Secondary',
        'quality': 'Special Issue',
        'basedamage': 123,
        'rateoffire': 120,
        'muzzleSpeed': 445,
        'magsize': 6,
        'weight': 1.6,
        'firemode': ['Semi-Auto'],
        'Misc': ['Staggers'],
      },
      {
        'name': 'b93 raffica',
        'type': 'pistol',
        'slot': 'Secondary',
        'quality': 'Military',
        'basedamage': 28,
        'rateoffire': 300,
        'muzzleSpeed': 380,
        'magsize': 21,
        'weight': 1.2,
        'firemode': ['Semi-Auto', 'Burst'],
        'Misc': ['None'],
      },
    ];

    const response = await request(app).get('/api/v1/weapons');
    const responseBody = response.body;

    expect(response.status).toEqual(200);
    expect(Array.isArray(responseBody)).toBe(true);

    for (const expectedObject of expectedObjects) {
      expect(responseBody).toContainEqual(expectedObject);
    }
  });
});

describe('weapons name Endpoint Test', () => {
  test('Endpoint should return the correct weapon object', async () => {
    const expectedObject = {
      'name': 'SW-SH 629',
      'type': 'pistol',
      'slot': 'Secondary',
      'quality': 'Special Issue',
      'basedamage': 123,
      'rateoffire': 120,
      'muzzleSpeed': 445,
      'magsize': 6,
      'weight': 1.6,
      'firemode': ['Semi-Auto'],
      'Misc': ['Staggers'],
    };

    const response = await request(app).get('/api/v1/weapons/SW-SH%20629');
    const responseBody = response.body;

    expect(response.status).toEqual(200);
    expect(responseBody).toEqual(expectedObject);
  });
});

describe('consumables Endpoint Test', () => {
  test('Endpoint should return the correct subset of objects for consumables', async () => {
    const expectedObjects = [
      {
        'name': 'bandage',
        'description': 'Restores Half of lost health',
        'quality': 'Common',
        'health': 0.5,
        'carry': 6,
      },
      {
        'name': 'Disinfectant',
        'description': 'Heals minor injuries',
        'quality': 'Common',
        'health': 20,
        'carry': 6,
      },
    ];

    const response = await request(app).get('/api/v1/consumables');
    const responseBody = response.body;

    expect(response.status).toEqual(200);
    expect(Array.isArray(responseBody)).toBe(true);

    for (const expectedObject of expectedObjects) {
      expect(responseBody).toContainEqual(expectedObject);
    }
  });
});

describe('consumables name Endpoint Test', () => {
  test('Endpoint should return the correct consumable object', async () => {
    const expectedObject = {
      'name': 'bandage',
      'description': 'Restores Half of lost health',
      'quality': 'Common',
      'health': 0.5,
      'carry': 6,
    };

    const response = await request(app).get('/api/v1/consumables/bandage');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedObject);
  });
});

describe('traps Endpoint Test', () => {
  test('Endpoint should return the correct subset of objects for traps', async () => {
    const expectedObjects = [
      {
        'name': 'Bear Trap',
        'description': 'A placeable trap that damages and slows outlanders down',
        'quality': 'Uncommon',
        'carry': 5,
        'notes': ['lose 10% health and stamina'],
      },
      {
        'name': 'Booby Trap',
        'description': 'Upon usage, booby traps a lootable container that its aimed at',
        'quality': 'Military',
        'carry': 3,
        'notes': ['30hp gone if failed'],
      },
    ];

    const response = await request(app).get('/api/v1/traps');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.arrayContaining(expectedObjects));
  });
});

describe('traps name Endpoint Test', () => {
  test('Endpoint should return the correct traps object', async () => {
    const expectedObject = {
      'name': 'Bear Trap',
      'description': 'A placeable trap that damages and slows outlanders down',
      'quality': 'Uncommon',
      'carry': 5,
      'notes': ['lose 10% health and stamina'],
    };

    const response = await request(app).get('/api/v1/traps/Bear%20Trap');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedObject);
  });
});

describe('tools Endpoint Test', () => {
  test('Endpoint should return the correct subset of objects for traps', async () => {
    const expectedObjects = [
      {
        'name': 'Armor Plate',
        'description': 'Protects your torso from damage, until it gets destroyed',
        'quality': 'Special Issue',
        'carry': 2,
      },
      {
        'name': 'Portable Signals Detector',
        'description': 'A consumable tool that will locate the nearest radio signal it detects',
        'quality': 'Special Issue',
        'carry': 2,
      },
    ];

    const response = await request(app).get('/api/v1/tools');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.arrayContaining(expectedObjects));
  });
});

describe('tools name Endpoint Test', () => {
  test('Endpoint should return the correct traps object', async () => {
    const expectedObject = {
      'name': 'Armor Plate',
      'description': 'Protects your torso from damage, until it gets destroyed',
      'quality': 'Special Issue',
      'carry': 2,
    };

    const response = await request(app).get('/api/v1/tools/Armor%20Plate');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedObject);
  });
});

describe('melees Endpoint Test', () => {
  test('Endpoint should return the correct subset of objects for melee', async () => {
    const expectedObjects = [
      {
        'name': 'the john',
        'type': 'Melee',
        'slot': 'Secondary',
        'quality': 'Special Issue',
        'basedamage': 35,
        'weight': 3.0,
        'firemode': ['None'],
        'Misc': ['None'],
      },
      {
        'name': 'Fällkniven A1',
        'type': 'Melee',
        'slot': 'Secondary',
        'quality': 'Rare',
        'basedamage': 25,
        'weight': 1,
        'firemode': ['None'],
        'Misc': ['None'],
      },
    ];

    const response = await request(app).get('/api/v1/melee');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.arrayContaining(expectedObjects));
  });
});

describe('melees name Endpoint Test', () => {
  test('Endpoint should return the correct melees object', async () => {
    const expectedObject = {
      'name': 'the john',
      'type': 'Melee',
      'slot': 'Secondary',
      'quality': 'Special Issue',
      'basedamage': 35,
      'weight': 3.0,
      'firemode': ['None'],
      'Misc': ['None'],
    };

    const response = await request(app).get('/api/v1/melee/the%20john');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedObject);
  });
});

describe('throwables Endpoint Test', () => {
  test('Endpoint should return the correct subset of objects for throwables', async () => {
    const expectedObjects = [
      {
        'name': 'M67 Frag Grenade',
        'description': 'A Fragmentation Hand Gernade, which has seen active service across the globe',
        'quality': 'Special Issue',
        'carry': 2,
      },
      {
        'name': 'M84 Flash Grenade',
        'description': 'Blind and deafen your enemies for a considerable tatical advantage',
        'quality': 'Military',
        'carry': 3,
        'notes': '4 seconds of no vision directly looking at it',
      },
    ];

    const response = await request(app).get('/api/v1/throwables');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.arrayContaining(expectedObjects));
  });
});

describe('throwables name Endpoint Test', () => {
  test('Endpoint should return the correct throwables object', async () => {
    const expectedObject = {
      'name': 'M67 Frag Grenade',
      'description': 'A Fragmentation Hand Gernade, which has seen active service across the globe',
      'quality': 'Special Issue',
      'carry': 2,
    };

    const response = await request(app).get('/api/v1/throwables/M67%20Frag%20Grenade');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedObject);
  });
});