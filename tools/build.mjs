import {mkdir,copyFile,cp,readFile,access} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
const html=await readFile(path.join(root,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="(assets\/[^"?#]+)"/g))await access(path.join(root,match[1]));
const destination=path.join(root,'dist');
await mkdir(destination,{recursive:true});
for(const file of ['index.html','styles.css','script.js','.nojekyll'])await copyFile(path.join(root,file),path.join(destination,file));
await cp(path.join(root,'assets'),path.join(destination,'assets'),{recursive:true});
console.log('Static site built in dist/.');

