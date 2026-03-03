const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'app');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(directoryPath);

let modifiedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Fix shadow-slate-200/50 dark:shadow-indigo-500/10 -> shadow-slate-200/50 dark:shadow-none
    content = content.replace(/dark:shadow-indigo-500\/10/g, 'dark:shadow-none');

    // Fix shadow-slate-200/60 dark:shadow-none (if anything had /60 before)
    // Actually, RadialModuleCard.tsx had dark:shadow-indigo-500/10 which is handled above. 

    // Fix hover:shadow-slate-200 (if not already followed by dark:hover:shadow-none)
    // We add dark:hover:shadow-none out of caution so we don't get white shadows on hover in dark mode
    content = content.replace(/hover:shadow-slate-200(?!\s+dark:hover:shadow-none)/g, 'hover:shadow-slate-200 dark:hover:shadow-none');

    // Fix app/asset-management/page.tsx etc dark:shadow-[0_0_40px_rgba(59,130,246,0.08)] -> dark:shadow-none
    content = content.replace(/dark:shadow-\[0_0_40px_rgba\(59,130,246,0\.08\)\]/g, 'dark:shadow-none');

    // Fix other dark mode shadows potentially leaking white glow
    // Actually the above regexes cover everything found in grep_search.

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedFiles++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Updated ${modifiedFiles} files.`);
