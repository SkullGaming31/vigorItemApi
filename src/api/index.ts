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
    message: `endpoints: \n NOTE: any :name is to be repleaces with the name of the item you are trying to search for.
    /weapons, /weapons/:name \n 
    /consumables, /consumables/:name \n 
    /tools, /tools/:name \n 
    /traps, /traps/:name \n
    /throwables, /throwables/:name \n
    /melees, /melees/:name \n`,
  });
});

router.use('/items', items);
router.use('/weapons', weapons);
router.use('/melee', melees);
router.use('/consumables', consumables);
router.use('/tools', tools);
router.use('/traps', traps);

export default router;
