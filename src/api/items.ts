import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();

interface Weapon {
  name: string;
  description: string;
  type: string;
  slot: string;
  quality: string;
  basedamage: number;
  rateoffire: number;
  muzzleSpeed: number;
  magsize: number;
  weight: number;
  firemode: string[];
  Misc: string[];
}

interface Consumable {
  name: string;
  description: string;
  quality: string;
  health: number;
  stamina: number;
  weight: number;
  carry: number;
}

interface Trap {
  name: string;
  description: string;
  quality: string;
  carry: number;
}

interface Melee {
  name: string;
  type: string;
  slot: string;
  quality: string;
  basedamage: number;
  weight: number;
}

interface Tools {
  name: string;
  description: string;
  quality: string;
  carry: number;
}

interface Throwable {
  name: string;
  description: string;
  quality: string;
  carry: number;
}

const itemsData = fs.readFileSync('./src/Item_Data.json', 'utf8');
const jsonData = JSON.parse(itemsData);

// Access the arrays for each item type within the JSON object
const weaponsData: Weapon[] = jsonData.weapon;
const meleesData: Melee[] = jsonData.melee;
const toolsData: Tools[] = jsonData.Tools;
const consumablesData: Consumable[] = jsonData.consumables;
const throwablesData: Throwable[] = jsonData.throwables;
const trapsData: Trap[] = jsonData.traps;


router.get('/', (req: Request, res: Response) => {
  res.json(jsonData);
});
router.get('/:name', (req: Request, res: Response) => {
  const itemName = req.params.name;
  let item: Weapon | Melee | Consumable | Throwable | Trap | undefined;

  // Search for the item in the respective arrays for each item type
  item = weaponsData.find((weapon: Weapon) => weapon.name === itemName);
  if (!item) {
    item = meleesData.find((meleeItem: Melee) => meleeItem.name === itemName);
  }
  if (!item) {
    item = consumablesData.find((consumable: Consumable) => consumable.name === itemName);
  }
  if (!item) {
    item = throwablesData.find((throwable: Throwable) => throwable.name === itemName);
  }
  if (!item) {
    item = trapsData.find((trap: Trap) => trap.name === itemName);
  }
  if (!item) {
    item = toolsData.find((tool: Tools) => tool.name === itemName);
  }

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

export default router;