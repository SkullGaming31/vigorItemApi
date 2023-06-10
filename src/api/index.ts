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
    message: 'any :name is to be repleaced with the name of the item you are trying to search for. items endpoint can just list everything, weapons, throwables, tools. weapon endpoint will only list items that are a weapon',
    endpoints: [
      { label: 'all items', endpoint: ['/items', '/items/:name'] },
      { label: 'weapons', endpoint: ['/weapons', '/weapons/:name'] },
      { label: 'consumables', endpoint: ['/consumables', '/consumables/:name'] },
      { label: 'tools', endpoint: ['/tools', '/tools/:name'] },
      { label: 'traps', endpoint: ['/traps', '/traps/:name'] },
      { label: 'throwables', endpoint: ['/throwables', '/throwables/:name'] },
      { label: 'melee', endpoint: ['/melees', '/melees/:name'] },
    ],
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
