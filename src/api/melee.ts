import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();
interface Melee {
  name: string;
  type: string;
  slot: string;
  quality: string;
  basedamage: number;
  weight: number;
}

const itemsData = fs.readFileSync('./Item_Data.json', 'utf8');
const jsonData = JSON.parse(itemsData);
const melees: Melee[] = jsonData.melee;

type MeleeResponse = Array<{
  name: string;
  type: string;
  slot: string;
  quality: string;
  basedamage: number;
  weight: number;
}>;


router.get<{}, MeleeResponse>('/', (req: Request, res: Response) => {
  res.json(melees);
});

router.get<{}, MeleeResponse>('/:name', (req: Request, res: Response) => {
  const itemName = req.params.name;
  const foundMelee = melees.find((melee: Melee) => melee.name === itemName);

  if (foundMelee) {
    res.json(foundMelee);
  } else {
    res.status(404).json({ message: 'Weapon not found' });
  }
});

export default router;