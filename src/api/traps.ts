import express, { Request, Response } from 'express';
import * as fs from 'fs';

const router = express.Router();

export interface Trap {
  name: string;
  description: string;
  quality: string;
  carry: number;
}
type TrapsResponse = Array<{
  name: string;
  description: string;
  quality: string;
  carry: number;
}>;

const itemsData = fs.readFileSync('./src/Item_Data.json', 'utf8');
const jsonData = JSON.parse(itemsData);
const trapsData: Trap[] = jsonData.traps;


router.get<{}, TrapsResponse>('/traps', (req: Request, res: Response) => {
  res.json(trapsData);
});

router.get('/traps/:name', (req: Request, res: Response) => {
  const itemName = req.params.name;
  const foundTrap = trapsData.find((trap: Trap) => trap.name === itemName);

  if (foundTrap) {
    res.json(foundTrap);
  } else {
    res.status(404).json({ message: 'Trap not found' });
  }
});

export default router;