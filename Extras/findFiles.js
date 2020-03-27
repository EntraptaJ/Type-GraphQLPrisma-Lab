// src/findFiles.ts
import { promises as fs, Dirent } from 'fs';
import { resolve as resolvePath } from 'path';
import { pathToFileURL } from 'url';
const JS_EXTS = ['.js', '.jsx'];
async function findFileReadDir(cwd, { fileName, extensions }) {
    // Get all files in a directory
    const directoryFiles = await fs.readdir(cwd, { withFileTypes: true });

    function findMatch(directoryItem) {
        const directoryFileName = directoryItem.name

        if (directoryItem.name.includes(fileName)) {
            if (directoryItem.isDirectory()) return true

            for (let extension of [...extensions, ...JS_EXTS]) {
                if(directoryFileName === fileName + extension){
                  return true;
                }
            }
        } 



        return false;
    }

    // Filter the diretory files to only thoose with passed extenison and `.js` or `.jsx`
    const matchedFiles = directoryFiles.filter(findMatch);

    if (matchedFiles.length > 1 || matchedFiles.length < 1)
        return undefined;

    const match = matchedFiles[0]
    if (match.isDirectory()) return findFileReadDir(resolvePath(cwd, match.name), { fileName: 'index', extensions })

    return resolvePath(cwd, matchedFiles[0].name);
}
export async function findFiles(cwd, fileRules) {
    const filePath = await findFileReadDir(cwd, fileRules);
    if (!filePath)
        throw new Error('No files found by finder');
    return pathToFileURL(filePath);
}
