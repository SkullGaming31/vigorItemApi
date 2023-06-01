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
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/items', items);
router.use('/weapons', weapons);
router.use('/melee', melees);
router.use('/consumables', consumables);
router.use('/tools', tools);
router.use('/traps', traps);

export default router;
