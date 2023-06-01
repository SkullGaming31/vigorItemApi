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

const itemsData = fs.readFileSync('./src/Item_Data.json', 'utf8');
const jsonData = JSON.parse(itemsData);

const weaponsData: Weapon[] = jsonData.weapon;

type WeaponResponse = Array<{
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
}>;

const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({ error: message });
};

router.get<{}, WeaponResponse>('/', (req: Request, res: Response) => {
  res.json(weaponsData);
});

router.get<{}, WeaponResponse>('/:name', (req: Request, res: Response) => {
  const itemName = req.params.name;
  const foundWeapon = weaponsData.find((weapon: Weapon) => weapon.name === itemName);

  if (foundWeapon) {
    res.json(foundWeapon);
  } else {
    sendErrorResponse(res, 404, 'Weapon not found');
  }
});

export default router;