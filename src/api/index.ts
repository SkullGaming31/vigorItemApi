import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import consumables from './consumables';
import items from './items';
import melees from './melee';
import throwables from './throwables';
import tools from './tools';
import traps from './traps';
import weapons from './weapon';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    notes: 'any :name is to be repleaced with the name of the item you are trying to search for. items endpoint can just list everything, weapons, throwables, tools. weapon endpoint will only list items that are a weapon',
    message: 'endpoints: ',
    endpoints: ['/items, /items/:name', '/weapons, /weapons/:name', '/consumables, /consumables/:name', '/tools, /tools/:name', '/traps, /traps/:name', '/throwables, /throwables/:name', '/melees, /melees/:name'],
  });
});

router.use('/items', items);
router.use('/weapons', weapons);
router.use('/melee', melees);
router.use('/consumables', consumables);
router.use('/tools', tools);
router.use('/traps', traps);
router.use('/throwables', throwables);

export default router;
