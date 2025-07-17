import fs from 'fs/promises';
import path from 'path';


export async function saveFileToPath(absolutePath, file) {
  if (!file || typeof file === 'string') {
    throw new Error('Invalid file object');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const dir = path.dirname(absolutePath);
  await fs.mkdir(dir, { recursive: true });

  await fs.writeFile(absolutePath, buffer);
}
