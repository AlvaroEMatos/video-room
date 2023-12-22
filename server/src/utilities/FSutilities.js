import fs from 'fs';

export function listFiles(dir){
  return fs.readdirSync(dir, { withFileTypes: true }).filter(dirent => dirent.isFile).map(dirent => dirent.name);
}

