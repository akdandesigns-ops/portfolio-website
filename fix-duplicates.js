const fs = require('fs');
const filePath = 'src/app/works/[id]/page.tsx';
let c = fs.readFileSync(filePath, 'utf8');
c = c.replace(/className="fade-up"\s+className="/g, 'className="fade-up ');
c = c.replace(/className="fade-in"\s+className="/g, 'className="fade-in ');
fs.writeFileSync(filePath, c);
console.log('Fixed duplicates');
