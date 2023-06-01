import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();
interface Tools {
  name: string;
  description: string;
  quality: string;
  carry: number;
}

const itemsData = fs.readFileSync('./src/Item_Data.json', 'utf8');
const jsonData = JSON.parse(itemsData);

const tools: Tools[] = jsonData.tools;

type ToolResponse = Array<{
  name: string;
  description: string;
  quality: string;
  carry: number;
}>;


router.get<{}, ToolResponse>('/', (req: Request, res: Response) => {
  res.json(tools);
});

router.get<{}, ToolResponse>('/:name', (req: Request, res: Response) => {
  const itemName = req.params.name;
  const foundTools = tools.find((tool: Tools) => tool.name === itemName);

  if (foundTools) {
    res.json(foundTools);
  } else {
    res.status(404).json({ message: 'Tool not found' });
  }
});

export default router;