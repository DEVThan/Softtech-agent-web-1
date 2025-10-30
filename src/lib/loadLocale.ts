import fs from 'fs';
import path from 'path';

export function loadLocale(locale: string, namespace: string) {
  const filePath = path.join(process.cwd(), 'src', 'locales', locale, `${namespace}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
