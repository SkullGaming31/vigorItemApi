import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();
interface Throwable {
  name: string;
  description: string;
  quality: string;
  carry: number;
}

const itemsData = fs.readFileSync('./Item_Data.json', 'utf8');
const jsonData = JSON.parse(itemsData);

const throwablesData: Throwable[] = jsonData.throwables;

type ThrowableResponse = Array<{
  name: string;
  description: string;
  quality: string;
  carry: number;
}>;


router.get<{}, ThrowableResponse>('/', (req: Request, res: Response) => {
  res.json(throwablesData);
});

router.get<{}, ThrowableResponse>('/:name', (req: Request, res: Response) => {
  const itemName = req.params.name;
  const foundThrowable = throwablesData.find((throwable: Throwable) => throwable.name === itemName);

  if (foundThrowable) {
    res.json(foundThrowable);
  } else {
    res.status(404).json({ message: 'Weapon not found' });
  }
});

export default router;