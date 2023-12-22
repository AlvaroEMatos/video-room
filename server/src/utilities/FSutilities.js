import fs from 'fs';

export function forceOpendirSync(path){
  // Verifica se o diretório existe
  if (!fs.existsSync(path)) {
    // Cria o diretório se não existir
    fs.mkdirSync(path, { recursive: true });
  }
  return path;
}

export function listFilesSync(path){
  return fs.readdirSync(path, { withFileTypes: true }).filter(dirent => dirent.isFile).map(dirent => dirent.name);
}

