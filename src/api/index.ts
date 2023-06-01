import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import consumables from './consumables';
import items from './items';
import melees from './melee';
import tools from './tools';
import traps from './traps';
import weapons from './weapon';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    notes: 'any :name is to be repleaced with the name of the item you are trying to search for.',
    message: 'endpoints: ',
    endpoints: ['/weapons, /weapons/:name', '/consumables, /consumables/:name', '/tools, /tools/:name', '/traps, /traps/:name', '/throwables, /throwables/:name', '/melees, /melees/:name'],
  });
});

router.use('/items', items);
router.use('/weapons', weapons);
router.use('/melee', melees);
router.use('/consumables', consumables);
router.use('/tools', tools);
router.use('/traps', traps);

export default router;
