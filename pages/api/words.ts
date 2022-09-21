import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs';
import path from 'path';

interface wordType {
  word: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const jsonDirectory = path.join(process.cwd(), '/pages/api/data');

  const fileContents = await fs.readFile(jsonDirectory + '/words.json', 'utf8');

  // if (req.method === 'GET') {
  //   return res.json({ 'ok': true })
  // }
  res.status(200).json(JSON.parse(fileContents))
}
