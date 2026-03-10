const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'app');

const replacements = [
    { regex: /\bdark:bg-slate-950\b/g, replacement: 'dark:bg-brand-darkBg' },
    { regex: /\bdark:bg-slate-900\b/g, replacement: 'dark:bg-brand-darkCard' },
    { regex: /\bdark:border-slate-800\b/g, replacement: 'dark:border-brand-darkBorder' },
    { regex: /\bdark:border-slate-700\b/g, replacement: 'dark:border-brand-darkBorder' },
    { regex: /\bdark:hover:bg-slate-800\b/g, replacement: 'dark:hover:bg-brand-darkHover' },
    { regex: /\bdark:hover:bg-slate-700\b/g, replacement: 'dark:hover:bg-brand-darkHover' },
    { regex: /\bdark:text-indigo-400\b/g, replacement: 'dark:text-brand-primary' },
    { regex: /\bdark:text-indigo-500\b/g, replacement: 'dark:text-brand-primary' },
    { regex: /\bdark:text-indigo-300\b/g, replacement: 'dark:text-brand-secondary' },
    { regex: /\bdark:bg-indigo-500\b/g, replacement: 'dark:bg-brand-primary' },
    { regex: /\bdark:bg-indigo-600\b/g, replacement: 'dark:bg-brand-primary' },
    { regex: /\bdark:hover:bg-indigo-600\b/g, replacement: 'dark:hover:bg-brand-primary' },
    { regex: /\bdark:ring-indigo-500\b/g, replacement: 'dark:ring-brand-primary' },
    // Remove neon glow effects usually achieved with large drop-shadows or violet/fuchsia
    { regex: /\bdrop-shadow-\[.*?rgba\(.*?\]\b/g, replacement: 'shadow-md shadow-black/20' },
    { regex: /\bshadow-indigo-500\/[0-9]+\b/g, replacement: 'shadow-brand-primary/20' }
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let changed = false;

            replacements.forEach(({ regex, replacement }) => {
                if (regex.test(content)) {
                    content = content.replace(regex, replacement);
                    changed = true;
                }
            });

            if (changed) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated: ${filePath}`);
            }
        }
    });
}

console.log('Starting theme replacement...');
processDirectory(directoryPath);
console.log('Theme replacement complete!');
