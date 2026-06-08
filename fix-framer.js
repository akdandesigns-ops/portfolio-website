const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/works/[id]/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace motion tags
content = content.replace(/<motion\.div/g, '<div');
content = content.replace(/<\/motion\.div>/g, '</div>');
content = content.replace(/<motion\.section/g, '<section');
content = content.replace(/<\/motion\.section>/g, '</section>');
content = content.replace(/<motion\.span/g, '<span');
content = content.replace(/<\/motion\.span>/g, '</span>');

// Replace {...fadeUp} and {...fadeIn} with GSAP classes if needed, or just remove them and use classes
content = content.replace(/{\.\.\.fadeUp}/g, 'className="fade-up"');
content = content.replace(/{\.\.\.fadeIn}/g, 'className="fade-in"');

// Fix className collision (e.g. className="fade-up" className="something")
// Wait, if it already had className, we just add it to it, or it might create duplicate classNames.
// We already have GSAP classes working, let's just do a manual replace using string manipulation:

content = content.replace(/{\.\.\.fadeUp}\s*className="/g, 'className="fade-up ');
content = content.replace(/{\.\.\.fadeIn}\s*className="/g, 'className="fade-in ');

// Remove initial, animate, whileInView, viewport, transition
content = content.replace(/\s*initial={{[^}]+}}\s*/g, ' ');
content = content.replace(/\s*animate={{[^}]+}}\s*/g, ' ');
content = content.replace(/\s*whileInView={{[^}]+}}\s*/g, ' ');
content = content.replace(/\s*viewport={{[^}]+}}\s*/g, ' ');
content = content.replace(/\s*transition={{[^}]+}}\s*/g, ' ');

fs.writeFileSync(filePath, content);
console.log('Fixed framer motion remnants');
