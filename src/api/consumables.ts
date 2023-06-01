import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();
interface Consumables {
  name: string;
  description: string;
  quality: string;
  health: number;
  stamina: number;
  weight: number;
  carry: number;
}

const itemsData = fs.readFileSync('./src/Item_Data.json', 'utf8');
const jsonData = JSON.parse(itemsData);
const consumables: Consumables[] = jsonData.consumables;

type ConsumablesResponse = Array<{
  name: string;
  description: string;
  quality: string;
  health: number;
  stamina: number;
  weight: number;
  carry: number;
}>;


router.get<{}, ConsumablesResponse>('/', (req: Request, res: Response) => {
  res.json(consumables);
});

router.get('/:name', (req: Request, res: Response) => {
  const itemName = req.params.name;
  const foundConsumable = consumables.find((consumable: Consumables) => consumable.name === itemName);

  if (foundConsumable) {
    res.json(foundConsumable);
  } else {
    res.status(404).json({ message: 'Consumable not found' });
  }
});

export default router;